import { useQuery } from '@tanstack/react-query';
import { ReservaApi } from 'api/reserva/reserva';
import { queryKeys } from 'queries/queryKeys';

export function useHistoricoReservaQuery(reservaId: string) {
  return useQuery({
    queryKey: queryKeys.reservaHistorico(reservaId),
    queryFn: () => ReservaApi.buscarHistoricoReserva(reservaId),
    enabled: !!reservaId,
  });
}
