import { useUsuarioAtualQuery } from 'queries/auth/useUsuarioAtualQuery';
import { useEffect } from 'react';
import { useAppStore } from 'store/app/appStore';

export function useAuthBootstrap() {
  const { isPending } = useUsuarioAtualQuery();
  const setLoading = useAppStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);
}
