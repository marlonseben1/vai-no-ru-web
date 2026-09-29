import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router';

export function PrivateLayout() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            vai-no-ru
          </Typography>
          <Button color="inherit" component={Link} to="/cardapio">
            Cardápio
          </Button>
          <Button color="inherit" component={Link} to="/reservas">
            Reservas
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
