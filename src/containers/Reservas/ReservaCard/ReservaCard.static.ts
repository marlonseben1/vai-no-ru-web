import { paletaDeCores } from 'theme/paletaDeCores';
import type { StatusReserva } from 'types';

export const ESTILO_CHIP_STATUS: Record<
  StatusReserva,
  { bgcolor: string; color: string }
> = {
  PENDENTE: {
    bgcolor: paletaDeCores.amarelo[100],
    color: paletaDeCores.amarelo[900],
  },
  AGENDADA: {
    bgcolor: paletaDeCores.verde[100],
    color: paletaDeCores.verde[700],
  },
  NAO_AGENDADA: {
    bgcolor: paletaDeCores.vermelho[100],
    color: paletaDeCores.vermelho[800],
  },
  INATIVA: {
    bgcolor: paletaDeCores.cinza[200],
    color: paletaDeCores.cinza[900],
  },
  CANCELADA: {
    bgcolor: paletaDeCores.cinza[200],
    color: paletaDeCores.cinza[900],
  },
};
