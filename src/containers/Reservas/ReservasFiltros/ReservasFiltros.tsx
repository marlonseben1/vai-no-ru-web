import {
  MenuItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { LABEL_STATUS_RESERVA } from 'constants/labels';
import useIsResponsivo from 'hooks/useIsResponsivo';
import type { DataFiltroReserva, StatusReserva } from 'types';
import { OPCOES_DATA_FILTRO } from '../Reservas.static';

interface ReservasFiltrosProps {
  dataFiltro: DataFiltroReserva | '';
  situacao: StatusReserva | '';
  onMudarDataFiltro: (valor: DataFiltroReserva | '') => void;
  onMudarSituacao: (valor: StatusReserva | '') => void;
}

export function ReservasFiltros({
  dataFiltro,
  situacao,
  onMudarDataFiltro,
  onMudarSituacao,
}: ReservasFiltrosProps) {
  const isResponsivo = useIsResponsivo();

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      useFlexGap
      sx={{ flexWrap: 'wrap' }}
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
            py: { xs: 0.5, sm: undefined },
            ...(!isResponsivo && {
              height: 40,
              fontSize: 14,
              textTransform: 'none',
              color: 'text.primary',
              '&.Mui-selected': {
                bgcolor: '#DCE9E7',
                fontWeight: 700,
                '&:hover': { bgcolor: '#DCE9E7' },
              },
            }),
          },
          ...(!isResponsivo && {
            '& .MuiToggleButtonGroup-grouped': { borderRadius: 0 },
          }),
        }}
        onChange={(_event, valor) => onMudarDataFiltro(valor ?? '')}
      >
        {OPCOES_DATA_FILTRO.map((opcao) => (
          <ToggleButton key={opcao.valor} value={opcao.valor}>
            {opcao.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <TextField
        select
        size="small"
        label={isResponsivo ? undefined : 'Status'}
        value={situacao}
        onChange={(event) =>
          onMudarSituacao(event.target.value as StatusReserva | '')
        }
        slotProps={{
          select: { displayEmpty: true },
          inputLabel: { shrink: true },
        }}
        sx={{
          width: { xs: '100%', sm: 170 },
          '& .MuiInputBase-root': {
            borderRadius: isResponsivo ? undefined : '8px',
          },
          '& .MuiInputBase-root:not(.MuiInputBase-multiline)': {
            height: isResponsivo ? undefined : 40,
          },
        }}
      >
        <MenuItem value="">Todos os status</MenuItem>
        {Object.entries(LABEL_STATUS_RESERVA).map(([valor, label]) => (
          <MenuItem key={valor} value={valor}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}
