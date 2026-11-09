import { Alert, Box, CircularProgress, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import useIsResponsivo from 'hooks/useIsResponsivo';
import { paletaDeCores } from 'theme/paletaDeCores';
import type { ReservaResumo } from 'types';
import { ReservaCard } from './ReservaCard/ReservaCard';
import { separarReservas } from './Reservas.helpers';
import { ReservasFiltros } from './ReservasFiltros/ReservasFiltros';
import { ReservasPaginacao } from './ReservasPaginacao/ReservasPaginacao';
import { ReservasProximasVazio } from './ReservasProximasVazio/ReservasProximasVazio';
import { ReservasSecao } from './ReservasSecao/ReservasSecao';
import { useReservas } from './useReservas';

export function Reservas() {
  const isResponsivo = useIsResponsivo();
  const {
    page,
    situacao,
    dataFiltro,
    totalPaginas,
    reservasQuery,
    handleAbrirCriar,
    handleMudarPagina,
    handleMudarSituacao,
    handleMudarDataFiltro,
  } = useReservas();

  const { data, isPending, isError, error } = reservasQuery;

  function renderReservas(reservas: ReservaResumo[]) {
    // só dá para afirmar que não há próximas quando tudo cabe numa página
    const todasNaMesmaPagina = totalPaginas <= 1;
    const { proximas, anteriores } = separarReservas(reservas);
    return (
      <>
        {(proximas.length > 0 || todasNaMesmaPagina) && (
          <ReservasSecao titulo="Próximas">
            {proximas.length > 0 ? (
              proximas.map((reserva) => (
                <ReservaCard key={reserva.id} reserva={reserva} />
              ))
            ) : (
              <ReservasProximasVazio onNovaReserva={handleAbrirCriar} />
            )}
          </ReservasSecao>
        )}
        {anteriores.length > 0 && (
          <ReservasSecao titulo="Anteriores">
            {anteriores.map((reserva) => (
              <ReservaCard
                key={reserva.id}
                reserva={reserva}
                compacto={!isResponsivo}
              />
            ))}
          </ReservasSecao>
        )}
      </>
    );
  }

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
        {renderReservas(data.data)}

        {totalPaginas > 1 && (
          <ReservasPaginacao
            page={page}
            total={data.total}
            totalPaginas={totalPaginas}
            onMudarPagina={handleMudarPagina}
          />
        )}
      </>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: { xs: 0, sm: '12px' },
        boxShadow: {
          xs: 'none',
          sm: `0 2px 8px ${alpha(paletaDeCores.cinza[950], 0.08)}`,
        },
        bgcolor: { xs: 'transparent', sm: 'background.paper' },
        width: '100%',
        minWidth: 0,
        maxWidth: 900,
        mx: 'auto',
        p: { xs: '20px 16px', sm: 4 },
        overflowY: 'auto',
        overflowX: 'hidden',
        flex: { xs: 1, sm: '0 1 auto' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
          alignItems: { xs: 'stretch', sm: 'flex-start' },
          justifyContent: 'space-between',
          columnGap: 3,
          rowGap: 3,
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            noWrap={isResponsivo}
            sx={{
              fontSize: isResponsivo ? 26 : 36,
              fontWeight: 700,
              color: 'text.primary',
            }}
          >
            Minhas reservas
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: { xs: 'none', sm: 'block' }, mt: '6px' }}
          >
            Acompanhe o status e histórico dos seus agendamentos no RU
          </Typography>
        </Box>

        <ReservasFiltros
          dataFiltro={dataFiltro}
          situacao={situacao}
          onMudarDataFiltro={handleMudarDataFiltro}
          onMudarSituacao={handleMudarSituacao}
        />
      </Box>

      {renderLista()}
    </Paper>
  );
}
