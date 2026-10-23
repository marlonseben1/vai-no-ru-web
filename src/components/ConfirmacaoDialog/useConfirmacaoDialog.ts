import {
  ConfirmacaoStore,
  useConfirmacaoStore,
} from 'store/confirmacao/confirmacao.store';

export function useConfirmacaoDialog() {
  const confirmacaoDialog = useConfirmacaoStore(
    (state) => state.confirmacaoDialog,
  );

  function handleConfirmar() {
    ConfirmacaoStore.responder(true);
  }

  function handleCancelar() {
    ConfirmacaoStore.responder(false);
  }

  function handleExited() {
    ConfirmacaoStore.limparConfirmacao();
  }

  return { handleExited, handleCancelar, handleConfirmar, confirmacaoDialog };
}
