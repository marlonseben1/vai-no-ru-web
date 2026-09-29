import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router';

export function PublicLayout() {
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
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
