import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { SlideUp } from 'components/SlideUp/SlideUp';
import useIsResponsivo from 'hooks/useIsResponsivo';
import { dialogMobileSx } from './DialogGeral.static';
import { useDialogGeral } from './useDialogGeral';

export function DialogGeral() {
  const { dialogGeral, handleClose, handleExited } = useDialogGeral();
  const isResponsivo = useIsResponsivo();

  if (!dialogGeral) return null;

  const { open, title, content, footer, rootProps } = dialogGeral;

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      {...rootProps}
      sx={isResponsivo ? dialogMobileSx : undefined}
      slots={isResponsivo ? { transition: SlideUp } : undefined}
      open={!!open}
      onClose={handleClose}
      slotProps={{
        ...rootProps?.slotProps,
        transition: { onExited: handleExited },
      }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && <DialogContent>{content}</DialogContent>}
      {footer && (
        <DialogActions
          sx={{
            px: 3,
            pb: 2,
            // no mobile os botões do rodapé ocupam a largura toda
            ...(isResponsivo && { '& .MuiButton-root': { flex: 1 } }),
          }}
        >
          {footer}
        </DialogActions>
      )}
    </Dialog>
  );
}
