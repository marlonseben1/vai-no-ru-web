import { useCardapioQuery } from 'queries/cardapio/useCardapioQuery';
import { dataDoDia } from 'shared/Cardapio/Cardapio.helpers';
import type { Cardapio } from 'types';
import { getJanelaDoCardapioPublico } from 'utils/diaDoCardapioPublico';

type CardapioDoDia =
  | { status: 'desabilitado' | 'carregando' | 'indisponivel' }
  | { status: 'disponivel'; cardapio: Cardapio };

export function useCardapioDoDia(habilitado: boolean): CardapioDoDia {
  const janela = getJanelaDoCardapioPublico();
  const { data, isError, isPending } = useCardapioQuery(janela, {
    enabled: habilitado,
    retry: false,
  });

  if (!habilitado) return { status: 'desabilitado' };

  if (isPending && !isError) return { status: 'carregando' };

  // a API devolve em ordem de data; pega o primeiro dia da janela com cardápio
  const cardapio = data?.find((dia) => dataDoDia(dia) >= janela.dataInicio);
  if (!cardapio) return { status: 'indisponivel' };

  return { status: 'disponivel', cardapio };
}
