import type { DialogProps } from '@mui/material';
import { useUsuarioAtualQuery } from 'queries/auth/useUsuarioAtualQuery';
import { useState } from 'react';
import { CesStore, useCesStore } from 'store/ces/ces.store';
import type { NotaCes } from 'types/ces';
import { getPrimeiroNome } from 'utils/getPrimeiroNome';
import { NOTA_SEM_COMENTARIO } from './CesDialog.static';
import { usePosicaoCes } from './usePosicaoCes';

export type EtapaCes = 'avaliacao' | 'comentario';

export function useCesDialog() {
  const cesDialog = useCesStore((state) => state.cesDialog);
  const { data: usuario } = useUsuarioAtualQuery();
  const posicao = usePosicaoCes();
  const primeiroNome = usuario ? getPrimeiroNome(usuario.nome) : undefined;

  const [etapa, setEtapa] = useState<EtapaCes>('avaliacao');
  const [nota, setNota] = useState<NotaCes | null>(null);
  const [comentario, setComentario] = useState('');

  function handleSelecionarNota(novaNota: NotaCes) {
    setNota(novaNota);
  }

  function handleEnviar() {
    CesStore.registrar({ nota, comentario: comentario.trim() || null });
    CesStore.fechar();
  }

  function handleConfirmarNota() {
    if (nota === null) return;

    if (nota === NOTA_SEM_COMENTARIO) handleEnviar();
    else setEtapa('comentario');
  }

  // fechar sem enviar também conta como resposta, para não perguntar de novo
  function handleClose() {
    CesStore.registrar({ nota, comentario: null });
    CesStore.fechar();
  }

  // só o X fecha: clicar fora ou apertar Esc não pode contar como resposta
  const handleDialogClose: DialogProps['onClose'] = (_evento, motivo) => {
    if (motivo === 'backdropClick' || motivo === 'escapeKeyDown') return;
    handleClose();
  };

  function handleExited() {
    CesStore.limparCesDialog();
    setEtapa('avaliacao');
    setNota(null);
    setComentario('');
  }

  return {
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
  };
}
