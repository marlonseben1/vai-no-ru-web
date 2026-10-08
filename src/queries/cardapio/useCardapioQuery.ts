import { useQuery } from '@tanstack/react-query';
import { CardapioApi } from 'api/cardapio/cardapio';
import { queryKeys } from 'queries/queryKeys';
import type { ListarCardapioParams } from 'types/cardapio';

export function useCardapioQuery(params: ListarCardapioParams) {
  return useQuery({
    queryKey: queryKeys.cardapio(params),
    queryFn: () => CardapioApi.buscarCardapio(params),
  });
}
