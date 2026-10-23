import { refeicoesDisponiveis } from 'shared/prazosReserva';
import type { ReservaResumo } from 'types/reserva';

function getDataIso(reserva: ReservaResumo) {
  return reserva.dataReserva.slice(0, 10);
}

export function podeEditarReserva(reserva: ReservaResumo) {
  return (
    reserva.status === 'PENDENTE' &&
    refeicoesDisponiveis(getDataIso(reserva)).some(
      (refeicao) => refeicao !== reserva.refeicao,
    )
  );
}

export function podeCancelarReserva(reserva: ReservaResumo) {
  return reserva.status === 'PENDENTE' || reserva.status === 'NAO_AGENDADA';
}

export function podeReativarReserva(reserva: ReservaResumo) {
  return reserva.status === 'CANCELADA';
}

export function podeForcarAgendamentoReserva(reserva: ReservaResumo) {
  return (
    podeCancelarReserva(reserva) &&
    refeicoesDisponiveis(getDataIso(reserva)).includes(reserva.refeicao)
  );
}
