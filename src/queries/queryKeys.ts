import type { ListarCardapioParams } from 'types/cardapio';
import type { ListarReservasParams } from 'types/reserva';

export const queryKeys = {
  usuarioAtual: ['usuario-atual'] as const,
  cardapio: (params: ListarCardapioParams) => ['cardapio', params] as const,
  reservas: {
    all: ['reservas'] as const,
    list: (params: ListarReservasParams) => ['reservas', params] as const,
  },
  reservaHistorico: (reservaId: string) =>
    ['reserva-historico', reservaId] as const,
};
