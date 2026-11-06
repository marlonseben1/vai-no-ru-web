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
import { ESTILO_CHIP_STATUS } from './ReservaCard.static';
import { useReservaCard } from './useReservaCard';

interface ReservaCardProps {
  reserva: ReservaResumo;
  /** linha discreta para reservas passadas (só no desktop) */
  compacto?: boolean;
}

export function ReservaCard({ reserva, compacto = false }: ReservaCardProps) {
  const {
    anchorEl,
    temAcoes,
    diaSemana,
    isResponsivo,
    abrirMenu,
    menuAberto,
    podeEditar,
    fecharMenu,
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

  const statusTexto = LABEL_STATUS_RESERVA[reserva.status];
  const chipStatus = (
    <Chip
      label={statusTexto}
      size="small"
      sx={{
        height: 28,
        borderRadius: '14px',
        fontSize: 13,
        fontWeight: 500,
        ...ESTILO_CHIP_STATUS[reserva.status],
      }}
    />
  );

  function estiloPaper() {
    if (compacto) {
      return {
        bgcolor: '#F6F8F8',
        borderColor: '#E3E8E8',
        borderRadius: '8px',
        p: 1,
      };
    }
    if (isResponsivo) {
      return { borderRadius: '12px', borderColor: '#DDE3E2', p: '14px' };
    }
    return { borderRadius: '8px', borderColor: '#C5CECD', p: 1.5 };
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: isResponsivo ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        gap: 2,
        ...estiloPaper(),
      }}
    >
      <Box
        sx={{
          minWidth: 0,
          ...(compacto && {
            display: 'flex',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            columnGap: 1.5,
          }),
        }}
      >
        <Typography
          sx={
            compacto
              ? { fontSize: 15, fontWeight: 500 }
              : { fontSize: 16, fontWeight: 700 }
          }
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
        {!isResponsivo &&
          (compacto ? (
            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
              {statusTexto}
            </Typography>
          ) : (
            chipStatus
          ))}
        <IconButton
          aria-label={`Mais ações para a reserva de ${diaSemana}, ${dataFormatada}`}
          disabled={isProcessando}
          onClick={abrirMenu}
          sx={{
            width: 44,
            height: 44,
            ...(isResponsivo && { mt: -0.5, mr: -0.75 }),
          }}
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
