import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';
import { AccountButtonMobile } from 'components/AccountMenu/AccountButtonMobile';
import { ALTURA_APPBAR_MOBILE } from 'layouts/PrivateLayout/PrivateLayout.static';
import { paletaDeCores } from 'theme/paletaDeCores';

// cabeçalho do mobile; no desktop quem faz esse papel é a NavBar
export function AppBar() {
  return (
    <MuiAppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: paletaDeCores.cinza[50],
        color: paletaDeCores.turquesa[900],
        fontFamily: 'Roboto, sans-serif',
        borderBottom: `1px solid ${paletaDeCores.cinza[400]}`,
      }}
    >
      <Toolbar sx={{ minHeight: ALTURA_APPBAR_MOBILE, pr: 0.5 }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: 'inherit',
            fontWeight: 'bold',
            fontSize: 20,
          }}
        >
          E aí, vai no RU hoje?
        </Typography>
        <AccountButtonMobile />
      </Toolbar>
    </MuiAppBar>
  );
}
