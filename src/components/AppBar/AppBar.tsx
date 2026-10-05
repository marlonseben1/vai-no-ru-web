import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';
import { AccountMenu } from 'components/AccountMenu/AccountMenu';
import { colorPalette, FONT_FAMILY_LAYOUT } from 'theme/colorPalette';

interface AppBarProps {
  showAccountMenu: boolean;
}

export function AppBar({ showAccountMenu }: AppBarProps) {
  return (
    <MuiAppBar
      position="static"
      elevation={1}
      sx={{
        bgcolor: colorPalette.neutral[50],
        color: colorPalette.primary[800],
        fontFamily: FONT_FAMILY_LAYOUT,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, fontFamily: 'inherit', fontWeight: 'bold' }}
        >
          E aí, vai no RU hoje?
        </Typography>
        {showAccountMenu && <AccountMenu />}
      </Toolbar>
    </MuiAppBar>
  );
}
