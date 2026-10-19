import { PostHogAnalytics } from 'lib/posthog';
import { useEffect } from 'react';
import { router } from 'routes/Router';

// o AppContent fica fora do RouterProvider, por isso assina o router direto
export function usePageview() {
  useEffect(() => {
    let ultimoPath: string | null = null;

    function registrar(path: string) {
      if (path === ultimoPath) return;
      ultimoPath = path;
      PostHogAnalytics.capturar('$pageview');
    }

    registrar(router.state.location.pathname);

    return router.subscribe((state) => registrar(state.location.pathname));
  }, []);
}
