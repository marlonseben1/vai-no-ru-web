import type { Dayjs } from 'dayjs';
import { type EventosPostHog, PostHogAnalytics } from 'lib/posthog';
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

export function formatarPeriodo(inicio: Dayjs, fim: Dayjs) {
  if (inicio.month() === fim.month()) {
    return `${inicio.format('DD')} – ${fim.format('DD')} de ${fim.format('MMMM [de] YYYY')}`;
  }
  return `${inicio.format('DD [de] MMMM')} – ${fim.format('DD [de] MMMM [de] YYYY')}`;
}

// "02 – 06 nov 2026" (usado no desktop)
export function formatarPeriodoCurto(inicio: Dayjs, fim: Dayjs) {
  const mes = (data: Dayjs) => data.format('MMM').replace('.', '');
  if (inicio.month() === fim.month()) {
    return `${inicio.format('DD')} – ${fim.format('DD')} ${mes(fim)} ${fim.format('YYYY')}`;
  }
  return `${inicio.format('DD')} ${mes(inicio)} – ${fim.format('DD')} ${mes(fim)} ${fim.format('YYYY')}`;
}

export function registrarNavegacao(
  direcao: EventosPostHog['cardapio_semana_navegada']['direcao'],
) {
  PostHogAnalytics.capturar('cardapio_semana_navegada', { direcao });
}
