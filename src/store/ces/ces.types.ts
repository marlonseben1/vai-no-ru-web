import type { ContextoCes, NotaCes } from 'types/ces';
import type { IStore } from '../types';

export type CesStoreType = IStore<CesStoreState, CesStoreActions>;

export interface CesDialog {
  open: boolean;
  contexto: ContextoCes;
}

export interface CesStoreState {
  cesDialog: CesDialog | null;
}

export interface RespostaCes {
  nota: NotaCes | null;
  comentario: string | null;
}

interface CesStoreActions {
  /** Abre a pesquisa se o servidor confirmar que o usuário ainda não a respondeu. */
  abrir(contexto: ContextoCes): Promise<void>;
  /** Grava a resposta (ou o fechamento sem nota) no servidor e no PostHog. */
  registrar(resposta: RespostaCes): Promise<void>;
  fechar(): void;
  /** Limpa o conteúdo depois da animação de saída, se nenhuma pesquisa nova abriu. */
  limparCesDialog(): void;
}
