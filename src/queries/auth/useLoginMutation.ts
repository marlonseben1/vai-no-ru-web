import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthApi } from 'api/auth/auth';
import { queryKeys } from 'queries/queryKeys';

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthApi.loginComGoogle,
    onSuccess: (usuario) => {
      queryClient.setQueryData(queryKeys.usuarioAtual, usuario);
    },
  });
}
