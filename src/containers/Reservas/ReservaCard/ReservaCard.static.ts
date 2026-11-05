import type { ChipProps } from '@mui/material';
import type { StatusReserva } from 'types';

export const COR_STATUS_RESERVA: Record<
  StatusReserva,
  NonNullable<ChipProps['color']>
> = {
  PENDENTE: 'primary',
  AGENDADA: 'success',
  NAO_AGENDADA: 'error',
  INATIVA: 'default',
  CANCELADA: 'warning',
};
