import { Backdrop, CircularProgress } from '@mui/material';
import { useAppStore } from 'store/app/appStore';

export function ScreenLoading() {
  const loading = useAppStore((state) => state.loading);

  return (
    <Backdrop
      open={loading}
      sx={{ zIndex: 10000, bgcolor: 'rgba(0, 0, 0, 0.7)' }}
      unmountOnExit
    >
      <CircularProgress size={72} thickness={6} />
    </Backdrop>
  );
}
