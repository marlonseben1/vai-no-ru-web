import { Backdrop, CircularProgress } from '@mui/material';
import { useAppStore } from 'store/app/appStore';

export function ScreenLoading() {
  const loading = useAppStore((state) => state.loading);

  return (
    <Backdrop
      open={loading}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress sx={{ color: '#fff' }} />
    </Backdrop>
  );
}
