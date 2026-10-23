import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { colorPalette } from 'theme/colorPalette';
import { useConfirmacaoDialog } from './useConfirmacaoDialog';

export function ConfirmacaoDialog() {
  const { handleExited, handleCancelar, handleConfirmar, confirmacaoDialog } =
    useConfirmacaoDialog();

  if (!confirmacaoDialog) return null;

  const {
    open,
    title,
    description,
    destructive,
    cancelLabel = 'Cancelar',
    confirmLabel = 'Confirmar',
  } = confirmacaoDialog;

  return (
    <Dialog
      open={open}
      onClose={handleCancelar}
      fullWidth
      maxWidth="xs"
      slotProps={{
        transition: { onExited: handleExited },
        paper: { sx: { borderRadius: 3 } },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontWeight: 'bold',
        }}
      >
        {title}
        <IconButton size="small" onClick={handleCancelar} aria-label="Fechar">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions
        disableSpacing
        sx={{
          px: 3,
          pb: 2,
          gap: 1,
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          '& .MuiButton-root': { width: { xs: '100%', sm: 'auto' } },
        }}
      >
        <Button
          variant="contained"
          disableElevation
          onClick={handleCancelar}
          sx={{
            borderRadius: 2,
            color: 'text.primary',
            bgcolor: colorPalette.neutral[100],
            '&:hover': { bgcolor: colorPalette.neutral[200] },
          }}
        >
          {cancelLabel}
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={handleConfirmar}
          color={destructive ? 'error' : 'primary'}
          sx={{ borderRadius: 2, py: { xs: 1.5, sm: undefined } }}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
