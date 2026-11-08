import { useQuery } from '@tanstack/react-query';
import { CardapioApi } from 'api/cardapio';
import { queryKeys } from 'queries/queryKeys';
import type { ListarCardapioParams } from 'types';

interface UseCardapioQueryOptions {
  enabled?: boolean;
  retry?: boolean | number;
}

export function useCardapioQuery(
  params: ListarCardapioParams,
  options: UseCardapioQueryOptions = {},
) {
  return useQuery({
    queryKey: queryKeys.cardapio(params),
    queryFn: () => CardapioApi.buscarCardapio(params),
    ...options,
  });
}
