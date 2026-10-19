import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReservaApi } from 'api/reserva/reserva';
import { PostHogAnalytics } from 'lib/posthog';
import { queryKeys } from 'queries/queryKeys';

export function useCancelarReservaMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ReservaApi.cancelarReserva,
    onSuccess: (_data, reservaId) => {
      PostHogAnalytics.capturar('reserva_cancelada');
      queryClient.invalidateQueries({ queryKey: queryKeys.reservas.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.reservaHistorico(reservaId),
      });
    },
  });
}
