import { PostHogAnalytics } from 'lib/posthog';
import { useUsuarioAtualQuery } from 'queries/auth/useUsuarioAtualQuery';
import { useEffect } from 'react';

export function usePostHogIdentify() {
  const { data: usuario } = useUsuarioAtualQuery();

  useEffect(() => {
    if (usuario) PostHogAnalytics.identificar(usuario);
  }, [usuario]);
}
