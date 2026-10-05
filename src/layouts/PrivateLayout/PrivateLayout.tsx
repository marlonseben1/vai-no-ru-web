import { Box } from '@mui/material';
import { AppBar } from 'components/AppBar/AppBar';
import { BottomMenu } from 'components/BottomMenu/BottomMenu';
import { Drawer } from 'components/Drawer/Drawer';
import useIsResponsivo from 'hooks/useIsResponsivo';
import { Outlet } from 'react-router';
import { requireAuthLoader } from 'routes/guards/requireAuthLoader';
import { COR_FUNDO_LAYOUT } from 'theme/colorPalette';

export const loader = requireAuthLoader;

export const Component = () => {
  const isResponsivo = useIsResponsivo();

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100dvh',
        width: '100%',
        overflowX: 'hidden',
        bgcolor: COR_FUNDO_LAYOUT,
      }}
    >
      {!isResponsivo && (
        <Box component="nav">
          <Drawer />
        </Box>
      )}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AppBar showAccountMenu={!isResponsivo} />
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 0, sm: 3 },
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </Box>
        {isResponsivo && <BottomMenu />}
      </Box>
    </Box>
  );
};
