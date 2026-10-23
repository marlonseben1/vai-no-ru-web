import { Button, DialogActions } from '@mui/material';
import { TEXTO_ENVIAR } from '../CesDialog.static';

interface CesRodapeProps {
  disabled: boolean;
  onEnviar: () => void;
}

export function CesRodape({ disabled, onEnviar }: CesRodapeProps) {
  return (
    <DialogActions sx={{ px: 3, pb: 3 }}>
      <Button
        fullWidth
        variant="contained"
        disableElevation
        disabled={disabled}
        onClick={onEnviar}
        sx={{ borderRadius: 2, py: 1.2 }}
      >
        {TEXTO_ENVIAR}
      </Button>
    </DialogActions>
  );
}
