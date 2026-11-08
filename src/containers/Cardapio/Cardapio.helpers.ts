import type { Dayjs } from 'dayjs';
import { type EventosPostHog, PostHogAnalytics } from 'lib/posthog';

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
