import {
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
import { useEditarReservaDialog } from './useEditarReservaDialog';

export function EditarReservaDialog() {
  const {
    open,
    opcoes,
    onClose,
    alterou,
    refeicao,
    handleSalvar,
    handleExited,
    dataFormatada,
    editarMutation,
    setRefeicaoEscolhida,
  } = useEditarReservaDialog();

  return (
    <Dialog
      open={open}
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
