import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReservaApi } from 'api/reserva/reserva';
import { PostHogAnalytics } from 'lib/posthog';
import { queryKeys } from 'queries/queryKeys';
import type { Refeicao } from 'types/refeicao';

interface EditarReservaVariables {
  reservaId: string;
  refeicao: Refeicao;
}

export function useEditarReservaMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reservaId, refeicao }: EditarReservaVariables) =>
      ReservaApi.editarReserva(reservaId, refeicao),
    onSuccess: (_data, { reservaId, refeicao }) => {
      PostHogAnalytics.capturar('reserva_editada', { refeicao });
      queryClient.invalidateQueries({ queryKey: queryKeys.reservas.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.reservaHistorico(reservaId),
      });
    },
  });
}
