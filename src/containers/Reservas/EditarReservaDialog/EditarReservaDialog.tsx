import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import { LABEL_REFEICAO } from 'shared/labels';
import type { Refeicao } from 'types/refeicao';
import type { ReservaResumo } from 'types/reserva';
import { useEditarReservaDialog } from './useEditarReservaDialog';

interface EditarReservaDialogProps {
  reserva: ReservaResumo | null;
  onClose: () => void;
}

export function EditarReservaDialog({
  reserva,
  onClose,
}: EditarReservaDialogProps) {
  const {
    refeicao,
    dataFormatada,
    opcoes,
    alterou,
    editarMutation,
    setRefeicaoEscolhida,
    handleSalvar,
    handleExited,
  } = useEditarReservaDialog({ reserva, onClose });

  return (
    <Dialog
      open={reserva !== null}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{
        transition: { onExited: handleExited },
        paper: { sx: { borderRadius: 3 } },
      }}
    >
      <DialogTitle>Editar reserva de {dataFormatada}</DialogTitle>

      <DialogContent>
        <TextField
          select
          fullWidth
          size="small"
          label="Refeição"
          value={refeicao}
          onChange={(event) =>
            setRefeicaoEscolhida(event.target.value as Refeicao)
          }
          sx={{ mt: 1 }}
        >
          {opcoes.map((valor) => (
            <MenuItem key={valor} value={valor}>
              {LABEL_REFEICAO[valor]}
            </MenuItem>
          ))}
        </TextField>

        {editarMutation.isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {editarMutation.error.message}
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Fechar</Button>
        <Button
          variant="contained"
          disabled={!alterou || editarMutation.isPending}
          onClick={handleSalvar}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
