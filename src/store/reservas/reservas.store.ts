import { create } from 'zustand';
import type { ReservasStoreState, ReservasStoreType } from './reservas.types';

const initialState: ReservasStoreState = {
  cadastroReservaDialog: { open: false, mode: 'criar' },
  filtros: { page: 1, situacao: '', dataFiltro: 'essa_semana' },
};

export const useReservasStore = create<ReservasStoreState>(() => initialState);

export const ReservasStore: ReservasStoreType = {
  setState: useReservasStore.setState,
  getState: useReservasStore.getState,

  setCadastroReservaDialog(payload) {
    useReservasStore.setState((state) => ({
      cadastroReservaDialog: payload
        ? { ...payload, open: true }
        : { ...state.cadastroReservaDialog, open: false },
    }));
  },
  setFiltros(payload) {
    useReservasStore.setState((state) => ({
      filtros: { ...state.filtros, page: 1, ...payload },
    }));
  },
  resetState() {
    useReservasStore.setState(initialState, true);
  },
};
