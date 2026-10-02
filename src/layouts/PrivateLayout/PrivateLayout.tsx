import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useLogoutMutation } from 'queries/auth/useLogoutMutation';
import { useUsuarioAtualQuery } from 'queries/auth/useUsuarioAtualQuery';
import { Link, Outlet, useNavigate } from 'react-router';
import { requireAuthLoader } from 'routes/guards/requireAuthLoader';

export const loader = requireAuthLoader;

export const Component = () => {
  const { data: usuario } = useUsuarioAtualQuery();
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();

  function handleLogout() {
    logoutMutation.mutate(undefined, { onSuccess: () => navigate('/') });
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            vai-no-ru
          </Typography>
          <Button color="inherit" component={Link} to="/cardapio">
            Cardápio
          </Button>
          <Button color="inherit" component={Link} to="/reservas">
            Reservas
          </Button>
          {usuario && (
            <Typography variant="body2" sx={{ mx: 2 }}>
              {usuario.nome}
            </Typography>
          )}
          <Button
            color="inherit"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flex: 1,
          p: { xs: 0, sm: 3 },
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
