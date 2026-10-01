import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiError } from 'api/ApiError';
import { AuthApi } from 'api/auth/auth';
import { queryKeys } from 'queries/queryKeys';
import type { Usuario } from 'types/usuario';

interface LoginInput {
  token: string;
  aceitarPolitica?: boolean;
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation<Usuario, ApiError, LoginInput>({
    mutationFn: AuthApi.loginComGoogle,
    onSuccess: (usuario) => {
      queryClient.setQueryData(queryKeys.usuarioAtual, usuario);
    },
  });
}
