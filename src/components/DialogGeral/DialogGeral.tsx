import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useDialogGeral } from './useDialogGeral';

export function DialogGeral() {
  const { dialogGeral, handleClose, handleExited } = useDialogGeral();

  if (!dialogGeral) return null;

  const { open, title, content, footer, rootProps } = dialogGeral;

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      {...rootProps}
      open={!!open}
      onClose={handleClose}
      slotProps={{ transition: { onExited: handleExited } }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && <DialogContent>{content}</DialogContent>}
      {footer && <DialogActions sx={{ px: 3, pb: 2 }}>{footer}</DialogActions>}
    </Dialog>
  );
}
