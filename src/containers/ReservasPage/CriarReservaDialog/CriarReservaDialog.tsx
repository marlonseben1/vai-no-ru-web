import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { CampoDatas } from 'components/CampoDatas/CampoDatas';
import useIsResponsivo from 'hooks/useIsResponsivo';
import { Controller } from 'react-hook-form';
import { LABEL_PERFIL } from 'shared/labels';
import { useCriarReservaDialog } from './useCriarReservaDialog';

interface CriarReservaDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CriarReservaDialog({ open, onClose }: CriarReservaDialogProps) {
  const isResponsivo = useIsResponsivo();
  const {
    control,
    email,
    perfisDisponiveis,
    exigeMatricula,
    diasBloqueados,
    criarReservasMutation,
    handleLimpar,
    handleExited,
    handleSubmit,
  } = useCriarReservaDialog({ onClose });

  return (
    <Dialog
      open={open}
      onClose={(_event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
        onClose();
      }}
      fullScreen={isResponsivo}
      fullWidth
      maxWidth="md"
      slotProps={{ transition: { onExited: handleExited } }}
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="h5" component="span" color="primary">
              Agendar reserva
            </Typography>
          </Box>
          <IconButton size="small" onClick={onClose} aria-label="Fechar">
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={4}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Perfil e identificação
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                }}
              >
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

                <Box
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridColumn: { md: '1 / -1' },
                    gridTemplateColumns: {
                      xs: '1fr',
                      md: exigeMatricula ? '2fr 1fr' : '1fr',
                    },
                  }}
                >
                  <Controller
                    control={control}
                    name="perfil"
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ''}
                        select
                        label="Seu perfil"
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
                </Box>
              </Box>
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Sua reserva
              </Typography>

              <Controller
                control={control}
                name="dias"
                render={({ field, fieldState }) => (
                  <CampoDatas
                    label="Datas e refeições"
                    value={field.value}
                    onChange={field.onChange}
                    diasBloqueados={diasBloqueados}
                    erro={fieldState.error?.message}
                  />
                )}
              />
            </Box>

            {criarReservasMutation.isError && (
              <Alert severity="error">
                {criarReservasMutation.error.message}
              </Alert>
            )}
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            p: 2,
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            gap: 1,
            '& > :not(style) ~ :not(style)': { ml: { xs: 0, sm: 1 } },
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<DeleteOutlined />}
            onClick={handleLimpar}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Limpar
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={criarReservasMutation.isPending}
            sx={{
              px: 4,
              fontWeight: 'bold',
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Registrar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
