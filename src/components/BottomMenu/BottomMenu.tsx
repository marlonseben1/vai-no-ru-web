import AddIcon from '@mui/icons-material/Add';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  ALTURA_BOTTOM_MENU,
  ITENS_MENU,
} from 'layouts/PrivateLayout/PrivateLayout.static';
import { paletaDeCores } from 'theme/paletaDeCores';
import { useBottomMenu, VALOR_NOVA_RESERVA } from './useBottomMenu';

const COR_DESTAQUE = paletaDeCores.turquesa[600];
const COR_INATIVO = paletaDeCores.cinza[800];

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
        bgcolor: paletaDeCores.neutra[0],
        borderTop: `1px solid ${paletaDeCores.cinza[400]}`,
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
                color: paletaDeCores.neutra[0],
                boxShadow: `0 2px 6px ${alpha(paletaDeCores.cinza[950], 0.25)}`,
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
