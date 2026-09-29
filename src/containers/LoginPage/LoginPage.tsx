import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Typography } from '@mui/material';

export function LoginPage() {
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
          bgcolor: 'secondary.main',
          color: '#F0E9BF',
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
        <Box sx={{ maxWidth: 380, width: '100%', mx: 'auto' }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 700, mb: 3 }}
          >
            Entre com o Google
          </Typography>

          <Button
            variant="outlined"
            size="large"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              color: 'text.primary',
              borderColor: 'grey.400',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              py: 1.5,
              '&:hover': {
                borderColor: 'text.primary',
                bgcolor: 'grey.100',
              },
            }}
          >
            Entrar com o Google
          </Button>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            Acesso exclusivo para alunos e professores com e-mail acadêmico
            @upf.br. Não é aluno ou professor? <u>Clique aqui</u>.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
