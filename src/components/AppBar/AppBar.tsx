import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';
import { AccountButtonMobile } from 'components/AccountMenu/AccountButtonMobile';
import { AccountMenu } from 'components/AccountMenu/AccountMenu';
import { ALTURA_APPBAR_MOBILE } from 'layouts/PrivateLayout/PrivateLayout.static';
import { colorPalette, FONT_FAMILY_LAYOUT } from 'theme/colorPalette';

interface AppBarProps {
  showAccountMenu: boolean;
}

// sem o menu de conta no topo (desktop), a conta fica no botão do cabeçalho mobile
export function AppBar({ showAccountMenu }: AppBarProps) {
  const mobile = !showAccountMenu;

  return (
    <MuiAppBar
      position="static"
      elevation={mobile ? 0 : 1}
      sx={{
        bgcolor: mobile ? '#F3F8F8' : colorPalette.neutral[50],
        color: mobile ? '#1F3B38' : colorPalette.primary[800],
        fontFamily: mobile ? 'Roboto, sans-serif' : FONT_FAMILY_LAYOUT,
        ...(mobile && { borderBottom: '1px solid #DDE3E2' }),
      }}
    >
      <Toolbar
        sx={mobile ? { minHeight: ALTURA_APPBAR_MOBILE, pr: 0.5 } : undefined}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: 'inherit',
            fontWeight: 'bold',
            ...(mobile && { fontSize: 20 }),
          }}
        >
          E aí, vai no RU hoje?
        </Typography>
        {showAccountMenu ? <AccountMenu /> : <AccountButtonMobile />}
      </Toolbar>
    </MuiAppBar>
  );
}
