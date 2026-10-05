import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
  Toolbar,
} from '@mui/material';
import { ITENS_MENU } from 'layouts/PrivateLayout/PrivateLayout.static';
import { useLocation, useNavigate } from 'react-router';
import { colorPalette, FONT_FAMILY_LAYOUT } from 'theme/colorPalette';

const DRAWER_WIDTH = 88;

export function Drawer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <MuiDrawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: DRAWER_WIDTH,
          fontFamily: FONT_FAMILY_LAYOUT,
        },
      }}
    >
      <Toolbar />
      <List>
        {ITENS_MENU.map(({ texto, caminho, icone }) => {
          const selecionado = pathname === caminho;
          return (
            <ListItem key={caminho} disablePadding>
              <ListItemButton
                selected={selecionado}
                onClick={() => navigate(caminho)}
                sx={{
                  m: 0.5,
                  px: 0.5,
                  py: 1,
                  borderRadius: 1,
                  flexDirection: 'column',
                  textAlign: 'center',
                  '&.Mui-selected, &.Mui-selected:hover': {
                    bgcolor: colorPalette.primary[50],
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    color: selecionado ? colorPalette.primary[800] : 'inherit',
                  }}
                >
                  {icone}
                </ListItemIcon>
                <ListItemText
                  primary={texto}
                  sx={{ m: 0, mt: 0.5 }}
                  slotProps={{
                    primary: {
                      sx: {
                        fontFamily: 'inherit',
                        fontSize: '0.6875rem',
                        lineHeight: 1.2,
                        fontWeight: selecionado ? 600 : 400,
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </MuiDrawer>
  );
}
