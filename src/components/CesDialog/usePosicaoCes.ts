import useIsResponsivo from 'hooks/useIsResponsivo';
import { FLAGS_POSTHOG } from 'lib/posthog';
import posthog from 'posthog-js';
import { useEffect, useState } from 'react';
import { POSICAO_CES_PADRAO, type PosicaoCes } from './CesDialog.static';

export function usePosicaoCes() {
  const isResponsivo = useIsResponsivo();
  const [variante, setVariante] = useState<string | boolean | undefined>();

  // a flag só é lida no desktop: ler no mobile registraria uma exposição que não vê a variante
  useEffect(() => {
    if (isResponsivo || !posthog.__loaded) return;

    return posthog.onFeatureFlags(() => {
      setVariante(posthog.getFeatureFlag(FLAGS_POSTHOG.cesPosicao));
    });
  }, [isResponsivo]);

  // em desenvolvimento, `?cesPosicao=canto` força a variante sem depender do PostHog
  const varianteForcada = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get('cesPosicao')
    : null;

  const posicao: PosicaoCes =
    isResponsivo || (varianteForcada ?? variante) === 'canto'
      ? 'canto'
      : POSICAO_CES_PADRAO;

  return posicao;
}
