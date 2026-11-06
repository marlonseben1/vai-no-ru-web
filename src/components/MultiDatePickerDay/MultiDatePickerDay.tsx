import { PickerDay, type PickerDayProps } from '@mui/x-date-pickers/PickerDay';

interface MultiDatePickerDayProps extends PickerDayProps {
  diasSelecionados?: string[];
  corPrincipal?: string;
}

export function MultiDatePickerDay({
  diasSelecionados = [],
  corPrincipal,
  day,
  sx,
  ...outros
}: MultiDatePickerDayProps) {
  const selecionado = diasSelecionados.includes(day.format('YYYY-MM-DD'));

  return (
    <PickerDay
      {...outros}
      day={day}
      selected={selecionado}
      disableHighlightToday
      aria-label={day.format('D [de] MMMM [de] YYYY')}
      sx={[
        {
          '--PickerDay-size': 'var(--tamanho-dia, 36px)',
          fontSize: '0.9375rem',
          ...(day.isSame(new Date(), 'day') && {
            textDecoration: 'underline',
            textUnderlineOffset: 4,
          }),
          '&:not(.Mui-selected):not(:focus-visible)': { outline: 'none' },
          '&.Mui-disabled': { color: 'text.disabled' },
          ...(corPrincipal && {
            '&.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus': {
              bgcolor: corPrincipal,
              color: 'common.white',
            },
          }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
