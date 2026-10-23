import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReservaApi } from 'api/reserva/reserva';
import { PostHogAnalytics } from 'lib/posthog';
import { queryKeys } from 'queries/queryKeys';

export function useCriarReservasMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ReservaApi.criarReservas,
    onSuccess: async (_data, { dias }) => {
      PostHogAnalytics.capturar('reserva_criada', {
        quantidadeDias: dias.length,
        refeicoes: [...new Set(dias.map((dia) => dia.refeicao))],
      });
      // mantém o loading global até a lista atualizada chegar
      await queryClient.invalidateQueries({ queryKey: queryKeys.reservas.all });
    },
  });
}
