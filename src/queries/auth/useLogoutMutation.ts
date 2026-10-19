import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthApi } from 'api/auth/auth';
import { PostHogAnalytics } from 'lib/posthog';
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
  });
}
