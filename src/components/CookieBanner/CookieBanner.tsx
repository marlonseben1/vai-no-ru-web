import { Button, Link, Paper, Stack, Typography } from '@mui/material';
import { useCookiesStore } from 'store/cookies/cookiesStore';

export function CookieBanner() {
  const escolha = useCookiesStore((state) => state.escolha);
  const aceitarCookies = useCookiesStore((state) => state.aceitarCookies);
  const recusarCookies = useCookiesStore((state) => state.recusarCookies);

  if (escolha !== 'pendente') return null;

  return (
    <Paper
      role="dialog"
      aria-labelledby="cookie-banner-titulo"
      elevation={8}
      sx={{
        position: 'fixed',
        left: { xs: 8, sm: 16 },
        right: { xs: 8, sm: 16 },
        bottom: { xs: 8, sm: 16 },
        mx: 'auto',
        zIndex: (theme) => theme.zIndex.snackbar,
        maxWidth: 720,
        p: { xs: 1.5, sm: 2.5 },
        borderRadius: 2,
      }}
    >
      <Stack spacing={{ xs: 1, sm: 1.5 }}>
        <Typography
          id="cookie-banner-titulo"
          component="h2"
          variant="subtitle1"
          sx={{ fontWeight: 700 }}
        >
          Cookies e privacidade
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
        >
          Usamos um cookie essencial para manter você conectado. Ele é
          necessário para o sistema funcionar e está sempre ativo.
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
        >
          A análise de uso e a gravação de tela, que usamos para identificar e
          corrigir problemas, são opcionais e só começam com a sua autorização.
          Seus dados pessoais ficam ocultos nas gravações.
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2 }}
          sx={{ pt: { sm: 0.5 }, alignItems: { sm: 'center' } }}
        >
          <Link
            href="/privacidade"
            target="_blank"
            rel="noopener"
            variant="body2"
            sx={{
              flex: { sm: 1 },
              fontSize: { xs: '0.8125rem', sm: '0.875rem' },
            }}
          >
            Saiba mais na política de privacidade
          </Link>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              onClick={recusarCookies}
              sx={{ flex: { xs: 1, sm: 'none' }, minWidth: { sm: 120 } }}
            >
              Recusar
            </Button>
            <Button
              variant="contained"
              onClick={aceitarCookies}
              sx={{ flex: { xs: 1, sm: 'none' }, minWidth: { sm: 120 } }}
            >
              Aceitar
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
