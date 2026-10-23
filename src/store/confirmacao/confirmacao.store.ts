import { create } from 'zustand';
import type {
  ConfirmacaoStoreState,
  ConfirmacaoStoreType,
} from './confirmacao.types';

const initialState: ConfirmacaoStoreState = { confirmacaoDialog: null };

// funções não são serializáveis: ficam fora do estado
let pendente: { resolve: () => void; reject: () => void } | null = null;

export const useConfirmacaoStore = create<ConfirmacaoStoreState>(
  () => initialState,
);

export const ConfirmacaoStore: ConfirmacaoStoreType = {
  setState: useConfirmacaoStore.setState,
  getState: useConfirmacaoStore.getState,

  confirmar(options) {
    pendente?.reject();
    useConfirmacaoStore.setState({
      confirmacaoDialog: { ...options, open: true },
    });
    return new Promise<void>((resolve, reject) => {
      pendente = { resolve, reject };
    });
  },
  responder(confirmado) {
    if (confirmado) pendente?.resolve();
    else pendente?.reject();
    pendente = null;
    useConfirmacaoStore.setState((state) => ({
      confirmacaoDialog: state.confirmacaoDialog && {
        ...state.confirmacaoDialog,
        open: false,
      },
    }));
  },
  limparConfirmacao() {
    useConfirmacaoStore.setState((state) =>
      state.confirmacaoDialog?.open ? state : { confirmacaoDialog: null },
    );
  },
  resetState() {
    pendente?.reject();
    pendente = null;
    useConfirmacaoStore.setState(initialState, true);
  },
};
