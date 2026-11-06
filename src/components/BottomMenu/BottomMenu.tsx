import AddIcon from '@mui/icons-material/Add';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from '@mui/material';
import {
  ALTURA_BOTTOM_MENU,
  ITENS_MENU,
} from 'layouts/PrivateLayout/PrivateLayout.static';
import { useBottomMenu, VALOR_NOVA_RESERVA } from './useBottomMenu';

const COR_DESTAQUE = '#3F706B';
const COR_INATIVO = '#4A5453';

const estiloAcao = {
  flex: 1,
  minWidth: 0,
  maxWidth: 'none',
  color: COR_INATIVO,
  '&.Mui-selected': { color: COR_DESTAQUE, fontWeight: 700 },
  '& .MuiBottomNavigationAction-label': {
    fontSize: 12,
    whiteSpace: 'nowrap',
    '&.Mui-selected': { fontSize: 12, fontWeight: 700 },
  },
};

export function BottomMenu() {
  const { pathname, handleMudar } = useBottomMenu();
  const [cardapio, reservas] = ITENS_MENU;

  function renderItem(item: (typeof ITENS_MENU)[number] | undefined) {
    if (!item) return null;
    return (
      <BottomNavigationAction
        key={item.caminho}
        value={item.caminho}
        label={item.texto}
        icon={item.icone}
        aria-current={pathname === item.caminho ? 'page' : undefined}
        sx={estiloAcao}
      />
    );
  }

  return (
    <Paper
      square
      elevation={0}
      sx={{
        bgcolor: '#FFFFFF',
        borderTop: '1px solid #DDE3E2',
        flexShrink: 0,
      }}
    >
      <BottomNavigation
        showLabels
        value={pathname}
        onChange={(_, valor: string) => handleMudar(valor)}
        sx={{ bgcolor: 'transparent', height: ALTURA_BOTTOM_MENU }}
      >
        {renderItem(cardapio)}
        <BottomNavigationAction
          value={VALOR_NOVA_RESERVA}
          aria-label="Nova reserva"
          disableRipple
          icon={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: COR_DESTAQUE,
                color: '#FFFFFF',
                boxShadow: '0 2px 6px rgba(31, 42, 42, 0.25)',
              }}
            >
              <AddIcon />
            </Box>
          }
          sx={{ flex: 1, minWidth: 0, maxWidth: 'none' }}
        />
        {renderItem(reservas)}
      </BottomNavigation>
    </Paper>
  );
}
