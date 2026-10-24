import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReservaApi } from 'api/reserva/reserva';
import { PostHogAnalytics } from 'lib/posthog';
import { Notificacao } from 'lib/sonner';
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
    onSuccess: async (_data, { reservaId, refeicao }) => {
      PostHogAnalytics.capturar('reserva_editada', { refeicao });
      Notificacao.sucesso({ titulo: 'Reserva atualizada com sucesso' });
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
        acao: 'editar',
        status: error.status,
        codigo: error.code ?? null,
      });
      Notificacao.erro({
        titulo: 'Não foi possível editar a reserva',
      });
    },
  });
}
