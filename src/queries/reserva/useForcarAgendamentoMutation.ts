import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReservaApi } from 'api/reserva/reserva';
import { PostHogAnalytics } from 'lib/posthog';
import { queryKeys } from 'queries/queryKeys';

export function useForcarAgendamentoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ReservaApi.forcarAgendamento,
    onSuccess: (_data, reservaId) => {
      PostHogAnalytics.capturar('reserva_agendamento_forcado');
      queryClient.invalidateQueries({ queryKey: queryKeys.reservas.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.reservaHistorico(reservaId),
      });
    },
  });
}
