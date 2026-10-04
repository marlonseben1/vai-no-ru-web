import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { LABEL_STATUS_RESERVA } from 'shared/labels';
import type { StatusReserva } from 'types/statusReserva';
import { CriarReservaDialog } from './CriarReservaDialog/CriarReservaDialog';
import { ReservaCard } from './ReservaCard/ReservaCard';
import { OPCOES_DATA_FILTRO } from './ReservasPage.static';
import { useReservasPage } from './useReservasPage';

export function ReservasPage() {
  const {
    page,
    totalPaginas,
    situacao,
    dataFiltro,
    reservasQuery,
    criarAberto,
    handleAbrirCriar,
    handleFecharCriar,
    handleMudarPagina,
    handleMudarSituacao,
    handleMudarDataFiltro,
    handleCancelar,
    handleReativar,
    isProcessando,
  } = useReservasPage();

  const { data, isPending, isError, error } = reservasQuery;

  function renderLista() {
    if (isPending) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (isError) {
      return <Alert severity="error">{error.message}</Alert>;
    }

    if (data.data.length === 0) {
      return (
        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 6 }}>
          Nenhuma reserva encontrada para os filtros selecionados.
        </Typography>
      );
    }

    return (
      <>
        <Stack spacing={1.5}>
          {data.data.map((reserva) => (
            <ReservaCard
              key={reserva.id}
              reserva={reserva}
              isProcessando={isProcessando(reserva.id)}
              onCancelar={handleCancelar}
              onReativar={handleReativar}
            />
          ))}
        </Stack>

        {totalPaginas > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPaginas}
              page={page}
              onChange={(_event, novaPagina) => handleMudarPagina(novaPagina)}
              color="primary"
              shape="rounded"
            />
          </Box>
        )}
      </>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: { xs: 0, sm: 2 },
        boxShadow: { xs: 'none', sm: 3 },
        width: '100%',
        minWidth: 0,
        maxWidth: 800,
        mx: 'auto',
        p: { xs: 2, sm: 4 },
        overflowY: 'auto',
        overflowX: 'hidden',
        flex: { xs: 1, sm: '0 1 auto' },
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1">
            Minhas reservas
          </Typography>
          <Button variant="contained" onClick={handleAbrirCriar}>
            Nova reserva
          </Button>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Acompanhe o status e histórico dos seus agendamentos no RU
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        useFlexGap
        sx={{ mb: 3, flexWrap: 'wrap' }}
      >
        <ToggleButtonGroup
          value={dataFiltro}
          exclusive
          size="small"
          sx={{
            width: { xs: '100%', sm: 'auto' },
            '& .MuiToggleButton-root': {
              flex: { xs: 1, sm: 'none' },
              minWidth: 0,
              px: { xs: 1, sm: 2 },
            },
          }}
          onChange={(_event, valor) => handleMudarDataFiltro(valor ?? '')}
        >
          {OPCOES_DATA_FILTRO.map((opcao) => (
            <ToggleButton key={opcao.valor} value={opcao.valor}>
              {opcao.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Select
          size="small"
          displayEmpty
          value={situacao}
          onChange={(event) =>
            handleMudarSituacao(event.target.value as StatusReserva | '')
          }
          sx={{ minWidth: { sm: 200 } }}
        >
          <MenuItem value="">Todos os status</MenuItem>
          {Object.entries(LABEL_STATUS_RESERVA).map(([valor, label]) => (
            <MenuItem key={valor} value={valor}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      {renderLista()}

      <CriarReservaDialog open={criarAberto} onClose={handleFecharCriar} />
    </Paper>
  );
}
