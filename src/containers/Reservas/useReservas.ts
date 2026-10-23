import { useReservasQuery } from 'queries/reserva/useReservasQuery';
import { useEffect } from 'react';
import { ReservasStore, useReservasStore } from 'store/reservas/reservas.store';
import { PAGE_SIZE_RESERVAS } from './Reservas.static';

export function useReservas() {
  const { page, situacao, dataFiltro } = useReservasStore(
    (state) => state.filtros,
  );

  // filtros e dialogs não sobrevivem à saída da tela
  useEffect(() => ReservasStore.resetState, []);

  const reservasQuery = useReservasQuery({
    page,
    pageSize: PAGE_SIZE_RESERVAS,
    sort: 'dataReserva',
    order: 'asc',
    ...(situacao ? { situacao } : {}),
    ...(dataFiltro ? { dataFiltro } : {}),
  });

  const totalPaginas = reservasQuery.data
    ? Math.ceil(reservasQuery.data.total / PAGE_SIZE_RESERVAS)
    : 0;

  function handleAbrirCriar() {
    ReservasStore.setCadastroReservaDialog({ mode: 'criar' });
  }

  function handleMudarPagina(novaPagina: number) {
    ReservasStore.setFiltros({ page: novaPagina });
  }

  function handleMudarSituacao(novaSituacao: typeof situacao) {
    ReservasStore.setFiltros({ situacao: novaSituacao });
  }

  function handleMudarDataFiltro(novoDataFiltro: typeof dataFiltro) {
    ReservasStore.setFiltros({ dataFiltro: novoDataFiltro });
  }

  return {
    page,
    situacao,
    dataFiltro,
    totalPaginas,
    reservasQuery,
    handleAbrirCriar,
    handleMudarPagina,
    handleMudarSituacao,
    handleMudarDataFiltro,
  };
}
