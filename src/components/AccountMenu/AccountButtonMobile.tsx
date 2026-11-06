import { Avatar, IconButton } from '@mui/material';
import {
  ALTURA_APPBAR_MOBILE,
  ALTURA_BOTTOM_MENU,
} from 'layouts/PrivateLayout/PrivateLayout.static';
import { AccountMenuMobile } from './AccountMenuMobile';
import { useAccountButtonMobile } from './useAccountButtonMobile';

export function AccountButtonMobile() {
  const {
    nome,
    inicial,
    saindo,
    aberta,
    handleSair,
    handleAlternar,
    handleConfiguracoes,
  } = useAccountButtonMobile();

  return (
    <>
      <IconButton
        aria-label="Conta"
        aria-haspopup="true"
        aria-controls={aberta ? 'account-menu' : undefined}
        aria-expanded={aberta}
        onClick={handleAlternar}
        sx={{ width: 44, height: 44 }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            fontSize: 14,
            bgcolor: '#C9D1D0',
            color: '#1F2A2A',
          }}
          data-ph-mask
        >
          {inicial}
        </Avatar>
      </IconButton>
      <AccountMenuMobile
        open={aberta}
        nome={nome}
        inicial={inicial}
        saindo={saindo}
        offsetSuperior={ALTURA_APPBAR_MOBILE}
        offsetInferior={ALTURA_BOTTOM_MENU}
        onConfiguracoes={handleConfiguracoes}
        onSair={handleSair}
      />
    </>
  );
}
