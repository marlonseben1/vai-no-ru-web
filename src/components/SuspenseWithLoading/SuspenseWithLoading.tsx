import { type ReactNode, Suspense, useEffect } from 'react';
import { useAppStore } from 'store/app/appStore';

interface SuspenseWithLoadingProps {
  children: ReactNode;
}

// reaproveita o loading global enquanto o chunk lazy é baixado
function LoadingGlobalFallback() {
  useEffect(() => {
    useAppStore.getState().setLoading(true);
    return () => useAppStore.getState().setLoading(false);
  }, []);

  return null;
}

export function SuspenseWithLoading({ children }: SuspenseWithLoadingProps) {
  return <Suspense fallback={<LoadingGlobalFallback />}>{children}</Suspense>;
}
