import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReservaApi } from 'api/reserva/reserva';
import { PostHogAnalytics } from 'lib/posthog';
import { queryKeys } from 'queries/queryKeys';

export function useCancelarReservaMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ReservaApi.cancelarReserva,
    onSuccess: async (_data, reservaId) => {
      PostHogAnalytics.capturar('reserva_cancelada');
      // mantém o loading global até a lista atualizada chegar
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.reservas.all }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.reservaHistorico(reservaId),
        }),
      ]);
    },
  });
}
