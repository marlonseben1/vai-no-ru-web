import { PostHogAnalytics } from 'lib/posthog';
import { useUsuarioAtualQuery } from 'queries/auth/useUsuarioAtualQuery';
import { useEffect } from 'react';
import { useCookiesStore } from 'store/cookies/cookiesStore';

/** Sincroniza o PostHog com o estado do app: escolha de cookies e usuário logado. */
export function usePostHogSync() {
  const { data: usuario } = useUsuarioAtualQuery();
  const escolha = useCookiesStore((state) => state.escolha);

  // a ordem importa: o opt-in precisa estar ligado antes de identificar o usuário
  useEffect(() => {
    PostHogAnalytics.definirConsentimento(escolha === 'aceito');
  }, [escolha]);

  useEffect(() => {
    if (usuario && escolha === 'aceito') {
      PostHogAnalytics.identificar(usuario);
    }
  }, [usuario, escolha]);
}
