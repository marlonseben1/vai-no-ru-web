import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { colorPalette, FONT_FAMILY_LAYOUT } from 'theme/colorPalette';
import { useAccountMenu } from './useAccountMenu';

export function AccountMenu() {
  const {
    inicial,
    anchorEl,
    aberto,
    saindo,
    handleAbrir,
    handleFechar,
    handleSair,
  } = useAccountMenu();

  return (
    <>
      <Tooltip title="Configurações">
        <IconButton
          sx={{ ml: 2 }}
          aria-label="Configurações da conta"
          aria-haspopup="true"
          aria-controls={aberto ? 'account-menu' : undefined}
          aria-expanded={aberto ? 'true' : undefined}
          onClick={handleAbrir}
        >
          <Avatar sx={{ width: 32, height: 32 }}>{inicial}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={aberto}
        onClose={handleFechar}
        onClick={handleFechar}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: `drop-shadow(0px 2px 8px ${colorPalette.neutral[200]})`,
              mt: 1.5,
              fontFamily: FONT_FAMILY_LAYOUT,
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleFechar} sx={{ fontFamily: 'inherit' }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configurações
        </MenuItem>
        <MenuItem
          onClick={handleSair}
          disabled={saindo}
          sx={{ fontFamily: 'inherit' }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </>
  );
}
