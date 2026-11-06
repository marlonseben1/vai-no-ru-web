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

// no mobile os chips usam cores próprias (fundo + texto), sem contorno
export const ESTILO_CHIP_STATUS_MOBILE: Record<
  StatusReserva,
  { bgcolor: string; color: string }
> = {
  PENDENTE: { bgcolor: '#FFEFCF', color: '#704400' },
  AGENDADA: { bgcolor: '#E1F0E4', color: '#1E5B2F' },
  NAO_AGENDADA: { bgcolor: '#FBE4E4', color: '#8A1C1C' },
  INATIVA: { bgcolor: '#E8ECEC', color: '#3A4443' },
  CANCELADA: { bgcolor: '#E8ECEC', color: '#3A4443' },
};
