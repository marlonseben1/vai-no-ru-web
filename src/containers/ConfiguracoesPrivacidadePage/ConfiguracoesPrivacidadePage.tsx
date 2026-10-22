import {
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { EMAIL_CONTATO } from 'constants/contato';
import { useCookiesStore } from 'store/cookies/cookiesStore';

const LINK_SOLICITAR_EXCLUSAO = `mailto:${EMAIL_CONTATO}?subject=${encodeURIComponent('Solicitação de exclusão de dados')}`;

export function ConfiguracoesPrivacidadePage() {
  const escolha = useCookiesStore((state) => state.escolha);
  const aceitarCookies = useCookiesStore((state) => state.aceitarCookies);
  const recusarCookies = useCookiesStore((state) => state.recusarCookies);

  return (
    <Box sx={{ p: 3, maxWidth: 720 }}>
      <Stack spacing={3}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
          Cookies e privacidade
        </Typography>

        <Paper variant="outlined">
          <Stack
            direction="row"
            spacing={2}
            sx={{ p: 2, alignItems: 'center' }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600 }}>Essenciais</Typography>
              <Typography variant="body2" color="text.secondary">
                Necessários para o sistema funcionar, como manter você
                conectado.
                <br />
                Não podem ser desativados.
              </Typography>
            </Box>
            <Switch
              checked
              disabled
              slotProps={{ input: { 'aria-label': 'Cookies essenciais' } }}
            />
          </Stack>

          <Divider />

          <Stack
            direction="row"
            spacing={2}
            sx={{ p: 2, alignItems: 'center' }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600 }}>
                Análise e gravação de tela
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nos ajudam a entender como o sistema é usado e a corrigir
                problemas.
                <br />
                Seus dados pessoais ficam ocultos nas gravações.
              </Typography>
            </Box>
            <Switch
              checked={escolha === 'aceito'}
              onChange={(event) =>
                event.target.checked ? aceitarCookies() : recusarCookies()
              }
              slotProps={{
                input: { 'aria-label': 'Análise e gravação de tela' },
              }}
            />
          </Stack>

          <Divider />

          <Stack
            direction="row"
            spacing={2}
            sx={{ p: 2, alignItems: 'center' }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600 }}>Seus dados</Typography>
              <Typography variant="body2" color="text.secondary">
                Você pode pedir acesso, correção ou exclusão dos seus dados.
                <br />O pedido é feito por e-mail.
              </Typography>
            </Box>
            <Button
              variant="outlined"
              href={LINK_SOLICITAR_EXCLUSAO}
              sx={{ flexShrink: 0 }}
            >
              Solicitar exclusão
            </Button>
          </Stack>
        </Paper>

        <Typography variant="body2">
          <Link href="/termos" target="_blank" rel="noopener">
            Termos de uso
          </Link>
          {' · '}
          <Link href="/privacidade" target="_blank" rel="noopener">
            Política de privacidade
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
}
