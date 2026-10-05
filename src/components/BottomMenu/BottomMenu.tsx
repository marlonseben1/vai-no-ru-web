import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import { AccountMenuFullscreen } from 'components/AccountMenu/AccountMenuFullscreen';
import { ITENS_MENU } from 'layouts/PrivateLayout/PrivateLayout.static';
import { colorPalette, FONT_FAMILY_LAYOUT } from 'theme/colorPalette';
import { useBottomMenu, VALOR_CONTA } from './useBottomMenu';

const ALTURA_BOTTOM_MENU = 56;

const estiloAcao = {
  fontFamily: FONT_FAMILY_LAYOUT,
  '&.Mui-selected': { color: colorPalette.primary[800] },
  '& .MuiBottomNavigationAction-label': { fontFamily: 'inherit' },
};

export function BottomMenu() {
  const {
    nome,
    inicial,
    saindo,
    contaAberta,
    valorSelecionado,
    handleMudar,
    handleFecharConta,
    handleSair,
  } = useBottomMenu();

  return (
    <>
      <AccountMenuFullscreen
        open={contaAberta}
        nome={nome}
        inicial={inicial}
        saindo={saindo}
        offsetInferior={ALTURA_BOTTOM_MENU}
        onClose={handleFecharConta}
        onSair={handleSair}
      />
      <Paper
        square
        elevation={3}
        sx={{ bgcolor: colorPalette.neutral[50], flexShrink: 0 }}
      >
        <BottomNavigation
          showLabels
          value={valorSelecionado}
          onChange={(_, valor: string) => handleMudar(valor)}
          sx={{ bgcolor: 'transparent', height: ALTURA_BOTTOM_MENU }}
        >
          {ITENS_MENU.map(({ texto, caminho, icone }) => (
            <BottomNavigationAction
              key={caminho}
              value={caminho}
              label={texto}
              icon={icone}
              sx={estiloAcao}
            />
          ))}
          <BottomNavigationAction
            value={VALOR_CONTA}
            label="Conta"
            icon={
              <Avatar sx={{ width: 24, height: 24, fontSize: '0.8rem' }}>
                {inicial}
              </Avatar>
            }
            aria-haspopup="true"
            aria-controls={contaAberta ? 'account-menu' : undefined}
            aria-expanded={contaAberta ? 'true' : undefined}
            sx={estiloAcao}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}
