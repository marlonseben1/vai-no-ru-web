import {
  type Cardapio,
  CategoriaItemCardapio,
  type ItemCardapio,
  type SeloCardapio,
} from 'types';

export interface LinhaItem {
  nome: string;
  selos: SeloCardapio[];
}

// a API devolve a data como ISO completo (YYYY-MM-DDT...)
export function dataDoDia(cardapio: Cardapio) {
  return cardapio.data.slice(0, 10);
}

export function paraLinha(item: ItemCardapio): LinhaItem {
  return { nome: item.nome, selos: item.selos ?? [] };
}

export function itensDaCategoria(
  cardapio: Cardapio,
  categoria: CategoriaItemCardapio,
) {
  return cardapio.menuDoDia
    .filter(
      // item sem categoria é tratado como acompanhamento
      (item) =>
        (item.categoria ?? CategoriaItemCardapio.Acompanhamento) === categoria,
    )
    .map(paraLinha);
}
