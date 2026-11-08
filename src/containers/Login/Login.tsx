import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import {
  COR_BORDA,
  COR_DESTAQUE,
  COR_TEXTO,
  COR_TEXTO_SECUNDARIO,
} from 'shared/Cardapio/Cardapio.static';
import { colorPalette } from 'theme/colorPalette';
import { desktopMediaQuery } from 'utils/isDesktop';
import { LoginCardapioHoje } from './LoginCardapioHoje/LoginCardapioHoje';
import { LoginGoogleBotao } from './LoginGoogleBotao/LoginGoogleBotao';
import { useLogin } from './useLogin';

const DESKTOP = `@media ${desktopMediaQuery}`;

export function Login() {
  const {
    erro,
    cardapio,
    enviando,
    aceitarPolitica,
    mostrarCardapio,
    setAceitarPolitica,
    handleGoogleSuccess,
    precisaAceitarPolitica,
    handleAceitarEContinuar,
  } = useLogin();

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        bgcolor: '#F6F8F7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2.5, md: 6 },
        py: { xs: 6, md: 8 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 480px)',
          [DESKTOP]: {
            gridTemplateColumns: mostrarCardapio
              ? 'minmax(0, 440px) minmax(0, 500px)'
              : 'minmax(0, 440px)',
          },
          columnGap: 16,
          rowGap: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack spacing={3.5}>
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 40, md: 56 },
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: colorPalette.primary[800],
              }}
            >
              Garanta seu desconto no RU!
            </Typography>
            <Typography
              sx={{
                mt: 2.5,
                fontSize: 18,
                lineHeight: 1.6,
                color: COR_TEXTO_SECUNDARIO,
              }}
            >
              Suas reservas do RU da UPF feitas automaticamente.
            </Typography>
          </Box>

          <Box
            sx={{
              p: 3.5,
              bgcolor: '#FFFFFF',
              border: `1px solid ${COR_BORDA}`,
              borderRadius: '20px',
              boxShadow: '0 1px 2px rgba(31, 42, 42, 0.04)',
            }}
          >
            <Stack spacing={3}>
              {!precisaAceitarPolitica && (
                <>
                  <Typography
                    component="h2"
                    sx={{ fontSize: 22, fontWeight: 700, color: COR_TEXTO }}
                  >
                    Acesse com sua conta da UPF
                  </Typography>

                  <LoginGoogleBotao onSuccess={handleGoogleSuccess} />

                  <Typography
                    sx={{ fontSize: 13, color: COR_TEXTO_SECUNDARIO }}
                  >
                    Contas que não são @upf.br ficam pendentes de aprovação.
                  </Typography>
                </>
              )}

              {precisaAceitarPolitica && (
                <>
                  <Stack spacing={1}>
                    <Typography
                      component="h2"
                      sx={{ fontSize: 22, fontWeight: 700, color: COR_TEXTO }}
                    >
                      Só mais uma etapa
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, color: COR_TEXTO_SECUNDARIO }}
                    >
                      Antes de continuar, você precisa aceitar nossos termos de
                      uso e a política de privacidade.
                    </Typography>
                  </Stack>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={aceitarPolitica}
                        onChange={(event) =>
                          setAceitarPolitica(event.target.checked)
                        }
                      />
                    }
                    label={
                      <>
                        Li e aceito os{' '}
                        <Link href="/termos" target="_blank" rel="noopener">
                          termos de uso
                        </Link>{' '}
                        e a{' '}
                        <Link
                          href="/privacidade"
                          target="_blank"
                          rel="noopener"
                        >
                          política de privacidade
                        </Link>
                      </>
                    }
                  />

                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={!aceitarPolitica || enviando}
                    onClick={handleAceitarEContinuar}
                  >
                    Aceitar e continuar
                  </Button>
                </>
              )}

              {erro && <Alert severity="warning">{erro}</Alert>}
            </Stack>
          </Box>

          <Typography
            sx={{
              fontSize: 14,
              textAlign: 'center',
              [DESKTOP]: { textAlign: 'left' },
            }}
          >
            <Link
              href="/termos"
              target="_blank"
              rel="noopener"
              sx={{ color: COR_DESTAQUE }}
            >
              Termos de uso
            </Link>
            <Box component="span" sx={{ color: COR_TEXTO_SECUNDARIO }}>
              {' · '}
            </Box>
            <Link
              href="/privacidade"
              target="_blank"
              rel="noopener"
              sx={{ color: COR_DESTAQUE }}
            >
              Política de privacidade
            </Link>
          </Typography>
        </Stack>

        {mostrarCardapio && <LoginCardapioHoje cardapio={cardapio} />}
      </Box>
    </Box>
  );
}
