import type { Dayjs } from 'dayjs';
import {
  type Cardapio,
  CategoriaItemCardapio,
  type ItemCardapio,
  type SeloCardapio,
} from 'types/cardapio';

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

export function formatarPeriodo(inicio: Dayjs, fim: Dayjs) {
  if (inicio.month() === fim.month()) {
    return `${inicio.format('DD')} – ${fim.format('DD')} de ${fim.format('MMMM [de] YYYY')}`;
  }
  return `${inicio.format('DD [de] MMMM')} – ${fim.format('DD [de] MMMM [de] YYYY')}`;
}
