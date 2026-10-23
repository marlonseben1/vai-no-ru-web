import { DialogContent, TextField } from '@mui/material';
import {
  COMENTARIO_MAX_CARACTERES,
  PLACEHOLDER_COMENTARIO,
} from '../CesDialog.static';

interface CesEtapaComentarioProps {
  comentario: string;
  onMudarComentario: (comentario: string) => void;
}

export function CesEtapaComentario({
  comentario,
  onMudarComentario,
}: CesEtapaComentarioProps) {
  return (
    <DialogContent>
      <TextField
        autoFocus
        multiline
        minRows={3}
        fullWidth
        value={comentario}
        onChange={(evento) => onMudarComentario(evento.target.value)}
        placeholder={PLACEHOLDER_COMENTARIO}
        slotProps={{ htmlInput: { maxLength: COMENTARIO_MAX_CARACTERES } }}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
      />
    </DialogContent>
  );
}
