import { AuthApi } from 'api/auth/auth';
import { queryClient } from 'queries/queryClient';
import { queryKeys } from 'queries/queryKeys';
import { type LoaderFunction, redirect } from 'react-router';

export const requireOnboardingPendenteLoader: LoaderFunction = async () => {
  const usuario = await queryClient.query({
    queryKey: queryKeys.usuarioAtual,
    queryFn: AuthApi.buscarUsuarioAtual,
    staleTime: 'static',
  });

  if (!usuario) {
    return redirect('/');
  }

  if (usuario.onboardingConcluidoEm) {
    return redirect('/cardapio');
  }

  return null;
};
