import { Backdrop, CircularProgress } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useAppStore } from 'store/app/appStore';
import { paletaDeCores } from 'theme/paletaDeCores';

export function ScreenLoading() {
  const loading = useAppStore((state) => state.loading);

  return (
    <Backdrop
      open={loading}
      sx={{
        zIndex: 10000,
        bgcolor: alpha(paletaDeCores.neutra[900], 0.7),
      }}
      unmountOnExit
    >
      <CircularProgress size={72} thickness={6} />
    </Backdrop>
  );
}
