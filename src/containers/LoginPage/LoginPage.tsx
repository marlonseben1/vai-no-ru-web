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
import { GoogleLogin } from '@react-oauth/google';
import { useLoginMutation } from 'queries/auth/useLoginMutation';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { colorPalette } from 'theme/colorPalette';

export function LoginPage() {
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [aceitarPolitica, setAceitarPolitica] = useState(false);

  const precisaAceitarPolitica =
    loginMutation.isError && loginMutation.error.code === 'CONSENT_REQUIRED';

  function enviarLogin(token: string, aceitar?: boolean) {
    loginMutation.mutate(
      { token, aceitarPolitica: aceitar },
      { onSuccess: () => navigate('/cardapio') },
    );
  }

  function handleGoogleSuccess(credentialResponse: { credential?: string }) {
    if (!credentialResponse.credential) return;
    setGoogleToken(credentialResponse.credential);
    enviarLogin(credentialResponse.credential);
  }

  function handleAceitarEContinuar() {
    if (!googleToken) return;
    enviarLogin(googleToken, true);
  }

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box
        sx={{
          flex: { xs: '0 0 auto', md: 1 },
          bgcolor: colorPalette.primary[800],
          color: colorPalette.primary[50],
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 4, md: 8 },
          py: { xs: 6, md: 4 },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.01em' }}
        >
          Sua vaga no RU,
          <br />
          garantida.
        </Typography>

        <Typography sx={{ mt: 3, maxWidth: 420, opacity: 0.9 }}>
          Reservas automáticas para o Restaurante Universitário da UPF, sem
          precisar preencher o formulário toda vez.
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 4, md: 8 },
          py: 6,
        }}
      >
        <Stack spacing={3} sx={{ maxWidth: 360, width: '100%', mx: 'auto' }}>
          {!precisaAceitarPolitica && (
            <>
              <Stack spacing={1}>
                <Typography
                  component="h2"
                  variant="h5"
                  sx={{ fontWeight: 700 }}
                >
                  Acesse com sua conta Google
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Contas <strong>@upf.br</strong> têm acesso liberado na hora.
                  Outros e-mails ficam como convidado, pendente de aprovação.
                </Typography>
              </Stack>

              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => {}} />
            </>
          )}

          {precisaAceitarPolitica && (
            <>
              <Stack spacing={1}>
                <Typography
                  component="h2"
                  variant="h5"
                  sx={{ fontWeight: 700 }}
                >
                  Só mais uma etapa
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Antes de continuar, você precisa aceitar nossa política de
                  privacidade.
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
                    Li e aceito a{' '}
                    <Link href="/privacidade" target="_blank" rel="noopener">
                      política de privacidade
                    </Link>
                  </>
                }
              />

              <Button
                variant="contained"
                size="large"
                fullWidth
                disabled={!aceitarPolitica || loginMutation.isPending}
                onClick={handleAceitarEContinuar}
              >
                Aceitar e continuar
              </Button>
            </>
          )}

          {loginMutation.isError && !precisaAceitarPolitica && (
            <Alert severity="warning">{loginMutation.error.message}</Alert>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
