import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { LABEL_PERFIL } from 'shared/labels';
import { colorPalette, FONT_FAMILY_LAYOUT } from 'theme/colorPalette';
import { useOnboardingPage } from './useOnboardingPage';

export function OnboardingPage() {
  const {
    control,
    email,
    perfisDisponiveis,
    exigeMatricula,
    concluirOnboardingMutation,
    handleSubmit,
  } = useOnboardingPage();

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: { xs: 'stretch', sm: 'center' },
        justifyContent: 'center',
        p: { xs: 0, sm: 3 },
        fontFamily: FONT_FAMILY_LAYOUT,
      }}
    >
      <Paper
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 520,
          p: { xs: 3, sm: 5 },
          borderRadius: { xs: 0, sm: 3 },
          boxShadow: { xs: 'none', sm: 3 },
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontFamily: 'inherit',
                fontWeight: 'bold',
                color: colorPalette.primary[800],
              }}
            >
              Bem-vindo ao Vai no RU!
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Confirme seus dados para continuar.{' '}
            </Typography>
          </Box>

          <TextField
            label="E-mail"
            value={email}
            disabled
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Controller
            control={control}
            name="nome"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Nome completo"
                placeholder="Seu nome"
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
            )}
          />

          <Controller
            control={control}
            name="perfil"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                value={field.value ?? ''}
                select
                label="Seu perfil"
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              >
                {perfisDisponiveis.map((perfil) => (
                  <MenuItem key={perfil} value={perfil}>
                    {LABEL_PERFIL[perfil]}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {exigeMatricula && (
            <Controller
              control={control}
              name="matricula"
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Matrícula"
                  placeholder="Ex: 123456"
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              )}
            />
          )}

          {concluirOnboardingMutation.isError && (
            <Alert severity="error">
              {concluirOnboardingMutation.error.message}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={concluirOnboardingMutation.isPending}
            sx={{ fontWeight: 'bold' }}
          >
            Continuar
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
