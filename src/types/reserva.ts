import type { Perfil } from './perfil';
import type { Refeicao } from './refeicao';
import type { StatusReserva } from './statusReserva';

export interface Reserva {
  id: string;
  usuarioId: string;
  dataReserva: string;
  refeicao: Refeicao;
  processado: boolean;
  status: StatusReserva;
  tentativas: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReservaResumo {
  id: string;
  dataReserva: string;
  refeicao: Refeicao;
  status: StatusReserva;
  createdAt: string;
}

export interface ReservaHistoricoItem {
  id: string;
  reservaId: string;
  acao: string;
  createdAt: string;
}

export interface ReservaDiaInput {
  data: string;
  refeicao: Refeicao;
}

export interface CriarReservasInput {
  nome: string;
  matricula?: string;
  perfil: Perfil;
  dias: ReservaDiaInput[];
}

export type SortColumnReserva =
  | 'dataReserva'
  | 'refeicao'
  | 'status'
  | 'createdAt';

export type DataFiltroReserva =
  | 'essa_semana'
  | 'semana_passada'
  | 'personalizado';

export interface ListarReservasParams {
  page?: number;
  pageSize?: number;
  sort?: SortColumnReserva;
  order?: 'asc' | 'desc';
  dataFiltro?: DataFiltroReserva;
  dataInicio?: string;
  dataFim?: string;
  refeicao?: Refeicao;
  situacao?: StatusReserva;
}

export interface ListarReservasResponse {
  data: ReservaResumo[];
  total: number;
  page: number;
  pageSize: number;
}
