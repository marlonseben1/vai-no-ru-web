import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReservaApi } from 'api/reserva/reserva';
import { queryKeys } from 'queries/queryKeys';

export function useCriarReservasMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ReservaApi.criarReservas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reservas.all });
    },
  });
}
