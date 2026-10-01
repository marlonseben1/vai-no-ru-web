import { useQuery } from '@tanstack/react-query';
import { AuthApi } from 'api/auth/auth';
import { queryKeys } from 'queries/queryKeys';

export function useUsuarioAtualQuery() {
  return useQuery({
    queryKey: queryKeys.usuarioAtual,
    queryFn: AuthApi.buscarUsuarioAtual,
  });
}
