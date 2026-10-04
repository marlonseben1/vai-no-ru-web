import CalendarMonth from '@mui/icons-material/CalendarMonth';
import {
  ButtonBase,
  Chip,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  Typography,
} from '@mui/material';
import { DatePickerDialog } from 'components/DatePickerDialog/DatePickerDialog';
import dayjs from 'dayjs';
import { useState } from 'react';
import { LABEL_REFEICAO } from 'shared/labels';
import type { ReservaDiaInput } from 'types/reserva';

interface CampoDatasProps {
  label: string;
  value: ReservaDiaInput[];
  diasBloqueados: string[];
  erro?: string;
  onChange: (dias: ReservaDiaInput[]) => void;
}

export function CampoDatas({
  label,
  value,
  diasBloqueados,
  erro,
  onChange,
}: CampoDatasProps) {
  const [aberto, setAberto] = useState(false);

  function handleRemover(data: string) {
    onChange(value.filter((dia) => dia.data !== data));
  }

  return (
    <FormControl error={!!erro} fullWidth>
      <FormLabel sx={{ mb: 0.5, fontSize: '0.875rem' }}>{label}</FormLabel>

      <ButtonBase
        component="div"
        onClick={() => setAberto(true)}
        aria-label={label}
        sx={{
          width: '100%',
          minHeight: 56,
          px: 1.5,
          py: 1,
          gap: 1,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-start',
          textAlign: 'left',
          border: 1,
          borderRadius: 1,
          borderColor: erro ? 'error.main' : 'divider',
          '&:hover': { borderColor: erro ? 'error.main' : 'text.primary' },
        }}
      >
        {value.length === 0 ? (
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Selecione as datas
          </Typography>
        ) : (
          <Stack
            direction="row"
            useFlexGap
            sx={{ flex: 1, flexWrap: 'wrap', gap: 1, minWidth: 0 }}
          >
            {value.map((dia) => (
              <Chip
                key={dia.data}
                size="small"
                color="primary"
                variant="outlined"
                label={`${dayjs(dia.data).format('DD/MM')} · ${LABEL_REFEICAO[dia.refeicao]}`}
                onDelete={() => handleRemover(dia.data)}
              />
            ))}
          </Stack>
        )}
        <CalendarMonth color="primary" />
      </ButtonBase>

      {erro && <FormHelperText>{erro}</FormHelperText>}

      <DatePickerDialog
        open={aberto}
        titulo={label}
        value={value}
        diasBloqueados={diasBloqueados}
        onChange={onChange}
        onClose={() => setAberto(false)}
      />
    </FormControl>
  );
}
