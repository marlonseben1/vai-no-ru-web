import CancelOutlined from '@mui/icons-material/CancelOutlined';
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
import { LABEL_REFEICAO, LABEL_STATUS_RESERVA } from 'shared/labels';
import type { ReservaResumo } from 'types/reserva';
import { COR_STATUS_RESERVA } from './ReservaCard.static';
import { useReservaCard } from './useReservaCard';

interface ReservaCardProps {
  reserva: ReservaResumo;
  isProcessando: boolean;
  onCancelar: (reservaId: string) => void;
  onReativar: (reservaId: string) => void;
}

export function ReservaCard({
  reserva,
  isProcessando,
  onCancelar,
  onReativar,
}: ReservaCardProps) {
  const {
    anchorEl,
    menuAberto,
    diaSemana,
    dataFormatada,
    podeCancelar,
    podeReativar,
    temAcoes,
    abrirMenu,
    fecharMenu,
    handleCancelar,
    handleReativar,
  } = useReservaCard({ reserva, onCancelar, onReativar });

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 2,
        px: 2,
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            textTransform: 'capitalize',
            fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
        >
          {diaSemana}, {dataFormatada}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {LABEL_REFEICAO[reserva.refeicao]}
        </Typography>
      </Box>

      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}
      >
        <Chip
          label={LABEL_STATUS_RESERVA[reserva.status]}
          color={COR_STATUS_RESERVA[reserva.status]}
          size="small"
          variant="outlined"
          sx={{ minWidth: { xs: 90, sm: 120 } }}
        />
        <IconButton
          size="small"
          aria-label="Ações da reserva"
          disabled={isProcessando}
          onClick={abrirMenu}
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
