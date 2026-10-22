import { Link as MuiLink, Stack } from '@mui/material';
import { Link } from 'react-router';
import { useCookiesStore } from 'store/cookies/cookiesStore';

export function Footer() {
  const redefinirEscolhaCookies = useCookiesStore(
    (state) => state.redefinirEscolhaCookies,
  );

  return (
    <Stack
      component="footer"
      direction="row"
      spacing={2}
      sx={{ p: 2, justifyContent: 'center', flexWrap: 'wrap' }}
    >
      <MuiLink component={Link} to="/termos" variant="body2">
        Termos de Uso
      </MuiLink>
      <MuiLink component={Link} to="/privacidade" variant="body2">
        Política de Privacidade
      </MuiLink>
      <MuiLink
        component="button"
        variant="body2"
        onClick={redefinirEscolhaCookies}
      >
        Preferências de cookies
      </MuiLink>
    </Stack>
  );
}
