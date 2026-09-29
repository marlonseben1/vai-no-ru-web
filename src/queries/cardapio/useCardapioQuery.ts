import { useQuery } from '@tanstack/react-query';
import { CardapioApi } from 'api/cardapio/cardapio';
import { queryKeys } from 'queries/queryKeys';

export function useCardapioQuery() {
  return useQuery({
    queryKey: queryKeys.cardapio,
    queryFn: CardapioApi.buscarCardapio,
  });
}
