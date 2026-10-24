import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReservaApi } from 'api/reserva/reserva';
import { PostHogAnalytics } from 'lib/posthog';
import { Notificacao } from 'lib/sonner';
import { queryKeys } from 'queries/queryKeys';

export function useForcarAgendamentoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ReservaApi.forcarAgendamento,
    onSuccess: async (_data, reservaId) => {
      PostHogAnalytics.capturar('reserva_agendamento_forcado');
      Notificacao.sucesso({ titulo: 'O agendamento foi forçado com sucesso!' });
      // mantém o loading global até a lista atualizada chegar
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.reservas.all }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.reservaHistorico(reservaId),
        }),
      ]);
    },
    onError: (error) => {
      PostHogAnalytics.capturar('reserva_erro', {
        acao: 'forcar_agendamento',
        status: error.status,
        codigo: error.code ?? null,
      });
      Notificacao.erro({
        titulo: 'Não foi possível forçar o agendamento',
      });
    },
  });
}
