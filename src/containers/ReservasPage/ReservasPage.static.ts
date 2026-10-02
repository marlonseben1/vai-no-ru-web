import type { DataFiltroReserva } from 'types/reserva';

export const PAGE_SIZE_RESERVAS = 5;

export const OPCOES_DATA_FILTRO: {
  valor: DataFiltroReserva | '';
  label: string;
}[] = [
  { valor: '', label: 'Todas' },
  { valor: 'essa_semana', label: 'Esta semana' },
  { valor: 'semana_passada', label: 'Semana passada' },
];
