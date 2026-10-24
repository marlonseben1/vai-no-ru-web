import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthApi } from 'api/auth/auth';
import { PostHogAnalytics } from 'lib/posthog';
import { Notificacao } from 'lib/sonner';
import { queryKeys } from 'queries/queryKeys';

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthApi.logout,
    onSuccess: () => {
      PostHogAnalytics.limpar();
      queryClient.clear();
      queryClient.setQueryData(queryKeys.usuarioAtual, null);
    },
    onError: () =>
      Notificacao.erro({
        titulo: 'Não foi possível sair',
      }),
  });
}
