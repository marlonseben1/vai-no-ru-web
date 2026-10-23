import type { DataFiltroReserva, ReservaResumo } from 'types/reserva';
import type { StatusReserva } from 'types/statusReserva';
import type { IStore } from '../types';

export type ReservasStoreType = IStore<
  ReservasStoreState,
  ReservasStoreActions
>;

export interface ReservasFiltros {
  page: number;
  situacao: StatusReserva | '';
  dataFiltro: DataFiltroReserva | '';
}

export interface CadastroReservaDialog {
  open: boolean;
  mode: 'criar' | 'editar';
  reserva?: ReservaResumo;
}

export interface ReservasStoreState {
  cadastroReservaDialog: CadastroReservaDialog;
  filtros: ReservasFiltros;
}

interface ReservasStoreActions {
  setCadastroReservaDialog(
    payload: Omit<CadastroReservaDialog, 'open'> | null,
  ): void;
  setFiltros(payload: Partial<ReservasFiltros>): void;
}
