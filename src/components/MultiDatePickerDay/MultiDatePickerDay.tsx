import { PickerDay, type PickerDayProps } from '@mui/x-date-pickers/PickerDay';

interface MultiDatePickerDayProps extends PickerDayProps {
  diasSelecionados?: string[];
  diasBloqueados?: string[];
}

export function MultiDatePickerDay({
  diasSelecionados = [],
  diasBloqueados = [],
  day,
  sx,
  ...outros
}: MultiDatePickerDayProps) {
  const dataISO = day.format('YYYY-MM-DD');
  const selecionado = diasSelecionados.includes(dataISO);
  const bloqueado = diasBloqueados.includes(dataISO);
  const fimDeSemana = day.day() === 0 || day.day() === 6;
  const corIndicador = bloqueado
    ? 'success.main'
    : fimDeSemana
      ? 'grey.400'
      : null;

  return (
    <PickerDay
      {...outros}
      day={day}
      selected={selecionado}
      sx={[
        {
          position: 'relative',
          '--PickerDay-size': 'var(--tamanho-dia, 36px)',
        },
        corIndicador && !outros.outsideCurrentMonth
          ? {
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 2,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 4,
                height: 4,
                borderRadius: '50%',
                bgcolor: corIndicador,
              },
            }
          : {},
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
