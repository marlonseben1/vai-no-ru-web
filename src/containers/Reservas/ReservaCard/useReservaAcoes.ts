import { useConfirmacao } from 'hooks/useConfirmacao';
import { useCancelarReservaMutation } from 'queries/reserva/useCancelarReservaMutation';
import { useForcarAgendamentoMutation } from 'queries/reserva/useForcarAgendamentoMutation';
import { useReativarReservaMutation } from 'queries/reserva/useReativarReservaMutation';
import { ReservasStore } from 'store/reservas/reservas.store';
import type { ReservaResumo } from 'types/reserva';

export function useReservaAcoes(reserva: ReservaResumo) {
  const confirmar = useConfirmacao();
  const cancelarMutation = useCancelarReservaMutation();
  const reativarMutation = useReativarReservaMutation();
  const forcarAgendamentoMutation = useForcarAgendamentoMutation();

  const isProcessando =
    cancelarMutation.isPending ||
    reativarMutation.isPending ||
    forcarAgendamentoMutation.isPending;

  function handleEditar() {
    ReservasStore.setCadastroReservaDialog({ mode: 'editar', reserva });
  }

  async function handleCancelar() {
    try {
      await confirmar({
        title: 'Cancelar reserva',
        description: 'Tem certeza que deseja cancelar esta reserva?',
        confirmLabel: 'Cancelar reserva',
        destructive: true,
      });
      cancelarMutation.mutate(reserva.id);
    } catch {}
  }

  async function handleReativar() {
    try {
      await confirmar({
        title: 'Reativar reserva',
        description: 'Tem certeza que deseja reativar esta reserva?',
        confirmLabel: 'Reativar',
      });
      reativarMutation.mutate(reserva.id);
    } catch {}
  }

  async function handleForcarAgendamento() {
    try {
      await confirmar({
        title: 'Forçar agendamento',
        description:
          'Isso envia esta reserva ao formulário do RU agora, sem esperar o horário automático. Deseja continuar?',
        confirmLabel: 'Forçar agendamento',
      });
      forcarAgendamentoMutation.mutate(reserva.id);
    } catch {}
  }

  return {
    handleEditar,
    isProcessando,
    handleCancelar,
    handleReativar,
    handleForcarAgendamento,
  };
}
