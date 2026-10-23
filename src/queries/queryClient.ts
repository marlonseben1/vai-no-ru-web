import { MutationCache, QueryClient } from '@tanstack/react-query';
import { useAppStore } from 'store/app/appStore';

export const queryClient = new QueryClient({
  // toda mutation bloqueia a tela, evitando novas ações com internet lenta
  mutationCache: new MutationCache({
    onMutate: () => useAppStore.getState().setLoading(true),
    onSettled: () => useAppStore.getState().setLoading(false),
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60_000,
    },
  },
});
