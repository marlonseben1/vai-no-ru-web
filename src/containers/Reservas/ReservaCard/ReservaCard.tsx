import CancelOutlined from '@mui/icons-material/CancelOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import EventAvailableOutlined from '@mui/icons-material/EventAvailableOutlined';
import MoreVert from '@mui/icons-material/MoreVert';
import ReplayOutlined from '@mui/icons-material/ReplayOutlined';
import {
  Box,
  Chip,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import { LABEL_REFEICAO, LABEL_STATUS_RESERVA } from 'constants/labels';
import type { ReservaResumo } from 'types';
import {
  COR_STATUS_RESERVA,
  ESTILO_CHIP_STATUS_MOBILE,
} from './ReservaCard.static';
import { useReservaCard } from './useReservaCard';

interface ReservaCardProps {
  reserva: ReservaResumo;
}

export function ReservaCard({ reserva }: ReservaCardProps) {
  const {
    anchorEl,
    temAcoes,
    diaSemana,
    abrirMenu,
    menuAberto,
    podeEditar,
    fecharMenu,
    isResponsivo,
    podeCancelar,
    podeReativar,
    handleEditar,
    isProcessando,
    dataFormatada,
    handleCancelar,
    handleReativar,
    podeForcarAgendamento,
    handleForcarAgendamento,
  } = useReservaCard({ reserva });

  const chipStatus = (
    <Chip
      label={LABEL_STATUS_RESERVA[reserva.status]}
      size="small"
      {...(isResponsivo
        ? {
            sx: {
              height: 28,
              borderRadius: '14px',
              fontSize: 13,
              fontWeight: 500,
              ...ESTILO_CHIP_STATUS_MOBILE[reserva.status],
            },
          }
        : {
            color: COR_STATUS_RESERVA[reserva.status],
            variant: 'outlined',
            sx: { minWidth: 120 },
          })}
    />
  );

  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: isResponsivo ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        gap: 2,
        ...(isResponsivo
          ? { borderRadius: '12px', borderColor: '#DDE3E2', p: '14px' }
          : { borderRadius: 2, px: 2, py: 1.5 }),
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: isResponsivo ? 700 : 600 }}
        >
          {diaSemana}, {dataFormatada}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {LABEL_REFEICAO[reserva.refeicao]}
        </Typography>
        {isResponsivo && <Box sx={{ mt: 1.25 }}>{chipStatus}</Box>}
      </Box>

      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}
      >
        {!isResponsivo && chipStatus}
        <IconButton
          size={isResponsivo ? 'medium' : 'small'}
          aria-label={`Mais ações para a reserva de ${diaSemana}, ${dataFormatada}`}
          disabled={isProcessando}
          onClick={abrirMenu}
          sx={
            isResponsivo
              ? { width: 44, height: 44, mt: -0.5, mr: -0.75 }
              : undefined
          }
        >
          <MoreVert fontSize="small" />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={menuAberto}
        onClose={fecharMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: { elevation: 3, sx: { borderRadius: 1, minWidth: 160 } },
        }}
      >
        {podeEditar && (
          <MenuItem onClick={handleEditar}>
            <ListItemIcon>
              <EditOutlined fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">Editar</Typography>
          </MenuItem>
        )}
        {podeForcarAgendamento && (
          <MenuItem onClick={handleForcarAgendamento}>
            <ListItemIcon>
              <EventAvailableOutlined fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">Forçar agendamento</Typography>
          </MenuItem>
        )}
        {podeCancelar && (
          <MenuItem onClick={handleCancelar}>
            <ListItemIcon>
              <CancelOutlined fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">Cancelar</Typography>
          </MenuItem>
        )}
        {podeReativar && (
          <MenuItem onClick={handleReativar}>
            <ListItemIcon>
              <ReplayOutlined fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">Reativar</Typography>
          </MenuItem>
        )}
        {!temAcoes && (
          <MenuItem disabled>
            <Typography variant="body2">Nenhuma ação disponível</Typography>
          </MenuItem>
        )}
      </Menu>
    </Paper>
  );
}
