import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthApi } from 'api/auth/auth';
import { queryKeys } from 'queries/queryKeys';

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthApi.logout,
    onSuccess: () => {
      queryClient.clear();
      queryClient.setQueryData(queryKeys.usuarioAtual, null);
    },
  });
}
