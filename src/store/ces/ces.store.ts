import { CesApi } from 'api/ces/ces';
import { PostHogAnalytics } from 'lib/posthog';
import { create } from 'zustand';
import type { CesStoreState, CesStoreType } from './ces.types';

const initialState: CesStoreState = { cesDialog: null };

export const useCesStore = create<CesStoreState>(() => initialState);

export const CesStore: CesStoreType = {
  setState: useCesStore.setState,
  getState: useCesStore.getState,

  async abrir(contexto) {
    if (CesStore.getState().cesDialog) return;

    try {
      const { exibirPesquisa } = await CesApi.getPodeMostrarCes();
      if (!exibirPesquisa) return;
    } catch {
      // a pesquisa é opcional: falhar em consultá-la não deve atrapalhar o uso
      return;
    }

    useCesStore.setState({ cesDialog: { open: true, contexto } });
    PostHogAnalytics.capturar('reserva_ces_exibida');
  },
  async registrar({ nota, comentario }) {
    const contexto = CesStore.getState().cesDialog?.contexto;
    if (!contexto) return;

    if (nota !== null) {
      PostHogAnalytics.capturar('reserva_ces_voto', {
        notaCes: nota,
        feedback: comentario,
      });
    }

    try {
      await CesApi.registrar({ contexto, nota, comentario });
    } catch {
      // ignora: o usuário já respondeu e não há o que refazer (ex.: 409 de resposta duplicada)
    }
  },
  fechar() {
    useCesStore.setState((state) => ({
      cesDialog: state.cesDialog && { ...state.cesDialog, open: false },
    }));
  },
  limparCesDialog() {
    useCesStore.setState((state) =>
      state.cesDialog?.open ? state : { cesDialog: null },
    );
  },
  resetState() {
    useCesStore.setState(initialState, true);
  },
};
