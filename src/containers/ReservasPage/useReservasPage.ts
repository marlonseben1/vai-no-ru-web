import { useConfirmacao } from 'hooks/useConfirmacao';
import { useCancelarReservaMutation } from 'queries/reserva/useCancelarReservaMutation';
import { useForcarAgendamentoMutation } from 'queries/reserva/useForcarAgendamentoMutation';
import { useReativarReservaMutation } from 'queries/reserva/useReativarReservaMutation';
import { useReservasQuery } from 'queries/reserva/useReservasQuery';
import { useState } from 'react';
import type { DataFiltroReserva } from 'types/reserva';
import type { StatusReserva } from 'types/statusReserva';
import { PAGE_SIZE_RESERVAS } from './ReservasPage.static';

export function useReservasPage() {
  const [page, setPage] = useState(1);
  const [situacao, setSituacao] = useState<StatusReserva | ''>('');
  const [dataFiltro, setDataFiltro] = useState<DataFiltroReserva | ''>(
    'essa_semana',
  );
  const [criarAberto, setCriarAberto] = useState(false);

  const reservasQuery = useReservasQuery({
    page,
    pageSize: PAGE_SIZE_RESERVAS,
    sort: 'dataReserva',
    order: 'asc',
    ...(situacao ? { situacao } : {}),
    ...(dataFiltro ? { dataFiltro } : {}),
  });

  const confirmar = useConfirmacao();
  const cancelarMutation = useCancelarReservaMutation();
  const reativarMutation = useReativarReservaMutation();
  const forcarAgendamentoMutation = useForcarAgendamentoMutation();

  const totalPaginas = reservasQuery.data
    ? Math.ceil(reservasQuery.data.total / PAGE_SIZE_RESERVAS)
    : 0;

  function handleAbrirCriar() {
    setCriarAberto(true);
  }

  function handleFecharCriar() {
    setCriarAberto(false);
  }

  function handleMudarPagina(novaPagina: number) {
    setPage(novaPagina);
  }

  function handleMudarSituacao(novaSituacao: StatusReserva | '') {
    setSituacao(novaSituacao);
    setPage(1);
  }

  function handleMudarDataFiltro(novoDataFiltro: DataFiltroReserva | '') {
    setDataFiltro(novoDataFiltro);
    setPage(1);
  }

  async function handleCancelar(reservaId: string) {
    try {
      await confirmar({
        title: 'Cancelar reserva',
        description: 'Tem certeza que deseja cancelar esta reserva?',
        confirmLabel: 'Cancelar reserva',
        destructive: true,
      });
      cancelarMutation.mutate(reservaId);
    } catch {}
  }

  async function handleReativar(reservaId: string) {
    try {
      await confirmar({
        title: 'Reativar reserva',
        description: 'Tem certeza que deseja reativar esta reserva?',
        confirmLabel: 'Reativar',
      });
      reativarMutation.mutate(reservaId);
    } catch {}
  }

  async function handleForcarAgendamento(reservaId: string) {
    try {
      await confirmar({
        title: 'Forçar agendamento',
        description:
          'Isso envia esta reserva ao formulário do RU agora, sem esperar o horário automático. Deseja continuar?',
        confirmLabel: 'Forçar agendamento',
      });
      forcarAgendamentoMutation.mutate(reservaId);
    } catch {}
  }

  function isProcessando(reservaId: string) {
    const cancelando =
      cancelarMutation.isPending && cancelarMutation.variables === reservaId;
    const reativando =
      reativarMutation.isPending && reativarMutation.variables === reservaId;
    const forcando =
      forcarAgendamentoMutation.isPending &&
      forcarAgendamentoMutation.variables === reservaId;
    return cancelando || reativando || forcando;
  }

  return {
    page,
    totalPaginas,
    situacao,
    dataFiltro,
    reservasQuery,
    criarAberto,
    handleAbrirCriar,
    handleFecharCriar,
    handleMudarPagina,
    handleMudarSituacao,
    handleMudarDataFiltro,
    handleCancelar,
    handleReativar,
    handleForcarAgendamento,
    isProcessando,
  };
}
