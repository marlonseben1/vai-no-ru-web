import type { IStore } from '../types';

export type ConfirmacaoStoreType = IStore<
  ConfirmacaoStoreState,
  ConfirmacaoStoreActions
>;

export interface ConfirmacaoOptions {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
}

export interface ConfirmacaoDialog extends ConfirmacaoOptions {
  open: boolean;
}

export interface ConfirmacaoStoreState {
  confirmacaoDialog: ConfirmacaoDialog | null;
}

interface ConfirmacaoStoreActions {
  /** Resolve se o usuário confirmar e rejeita se cancelar ou se outra confirmação abrir. */
  confirmar(options: ConfirmacaoOptions): Promise<void>;
  /** Fecha o dialog e resolve (`true`) ou rejeita (`false`) a confirmação pendente. */
  responder(confirmado: boolean): void;
  /** Limpa o conteúdo depois da animação de saída, se nenhuma confirmação nova abriu. */
  limparConfirmacao(): void;
}
