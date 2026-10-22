import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Footer } from 'components/Footer/Footer';
import { useUsuarioAtualQuery } from 'queries/auth/useUsuarioAtualQuery';
import { Link, Outlet } from 'react-router';

export function PublicLayout() {
  const { data: usuario } = useUsuarioAtualQuery();

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            vai-no-ru
          </Typography>
          {usuario && (
            <Button color="inherit" component={Link} to="/reservas">
              Reservas
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: 3, flex: 1 }}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
