import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiError } from 'api/ApiError';
import { AuthApi } from 'api/auth/auth';
import { queryKeys } from 'queries/queryKeys';
import type { Perfil } from 'types/perfil';
import type { Usuario } from 'types/usuario';

interface OnboardingInput {
  nome: string;
  perfil: Perfil;
  matricula?: string;
}

export function useConcluirOnboardingMutation() {
  const queryClient = useQueryClient();

  return useMutation<Usuario, ApiError, OnboardingInput>({
    mutationFn: AuthApi.concluirOnboarding,
    onSuccess: (usuario) => {
      queryClient.setQueryData(queryKeys.usuarioAtual, usuario);
    },
  });
}
