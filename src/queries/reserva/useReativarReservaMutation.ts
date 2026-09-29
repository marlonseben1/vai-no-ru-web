import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReservaApi } from 'api/reserva/reserva';
import { queryKeys } from 'queries/queryKeys';

export function useReativarReservaMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ReservaApi.reativarReserva,
    onSuccess: (_data, reservaId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reservas.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.reservaHistorico(reservaId),
      });
    },
  });
}
