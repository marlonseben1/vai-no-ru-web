import { Dialog } from '@mui/material';
import { CesCabecalho } from './CesCabecalho/CesCabecalho';
import {
  ESTILO_POR_POSICAO,
  getTituloAvaliacao,
  ID_TITULO_CES,
  NOTA_SEM_COMENTARIO,
  TITULO_COMENTARIO_POR_NOTA,
} from './CesDialog.static';
import { CesEtapaAvaliacao } from './CesEtapaAvaliacao/CesEtapaAvaliacao';
import { CesEtapaComentario } from './CesEtapaComentario/CesEtapaComentario';
import { CesRodape } from './CesRodape/CesRodape';
import { useCesDialog } from './useCesDialog';

export function CesDialog() {
  const {
    nota,
    etapa,
    posicao,
    primeiroNome,
    comentario,
    cesDialog,
    handleClose,
    handleExited,
    handleEnviar,
    setComentario,
    handleDialogClose,
    handleConfirmarNota,
    handleSelecionarNota,
  } = useCesDialog();

  if (!cesDialog) return null;

  const { dialogProps, dialogSx, paperSx } = ESTILO_POR_POSICAO[posicao];
  const titulo =
    etapa === 'comentario' && nota && nota !== NOTA_SEM_COMENTARIO
      ? TITULO_COMENTARIO_POR_NOTA[nota]
      : getTituloAvaliacao(primeiroNome);

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      aria-labelledby={ID_TITULO_CES}
      {...dialogProps}
      open={cesDialog.open}
      sx={dialogSx}
      onClose={handleDialogClose}
      slotProps={{
        transition: { onExited: handleExited },
        paper: { sx: paperSx },
      }}
    >
      <CesCabecalho titulo={titulo} onFechar={handleClose} />

      {etapa === 'avaliacao' && (
        <CesEtapaAvaliacao
          nota={nota}
          posicao={posicao}
          onSelecionarNota={handleSelecionarNota}
        />
      )}

      {etapa === 'comentario' && nota && (
        <CesEtapaComentario
          comentario={comentario}
          onMudarComentario={setComentario}
        />
      )}

      <CesRodape
        disabled={etapa === 'avaliacao' && nota === null}
        onEnviar={etapa === 'avaliacao' ? handleConfirmarNota : handleEnviar}
      />
    </Dialog>
  );
}
