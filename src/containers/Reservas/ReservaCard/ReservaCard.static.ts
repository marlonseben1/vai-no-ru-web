import type { StatusReserva } from 'types';

export const ESTILO_CHIP_STATUS: Record<
  StatusReserva,
  { bgcolor: string; color: string }
> = {
  PENDENTE: { bgcolor: '#FFEFCF', color: '#704400' },
  AGENDADA: { bgcolor: '#E1F0E4', color: '#1E5B2F' },
  NAO_AGENDADA: { bgcolor: '#FBE4E4', color: '#8A1C1C' },
  INATIVA: { bgcolor: '#E8ECEC', color: '#3A4443' },
  CANCELADA: { bgcolor: '#E8ECEC', color: '#3A4443' },
};
