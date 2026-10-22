import dayjs from 'dayjs';
import useIsResponsivo from 'hooks/useIsResponsivo';
import { type MouseEvent, useState } from 'react';
import { refeicoesDisponiveis } from 'shared/prazosReserva';
import type { ReservaResumo } from 'types/reserva';

interface UseReservaCardParams {
  reserva: ReservaResumo;
  onCancelar: (reservaId: string) => void;
  onReativar: (reservaId: string) => void;
  onForcarAgendamento: (reservaId: string) => void;
}

export function useReservaCard({
  reserva,
  onCancelar,
  onReativar,
  onForcarAgendamento,
}: UseReservaCardParams) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isResponsivo = useIsResponsivo();

  const podeCancelar =
    reserva.status === 'PENDENTE' || reserva.status === 'NAO_AGENDADA';
  const podeReativar = reserva.status === 'CANCELADA';

  const dataIso = reserva.dataReserva.slice(0, 10);
  const podeForcarAgendamento =
    podeCancelar && refeicoesDisponiveis(dataIso).includes(reserva.refeicao);
  const temAcoes = podeCancelar || podeReativar;

  const data = dayjs(dataIso);
  const diaSemana = isResponsivo
    ? data.format('dddd').replace('-feira', '')
    : data.format('dddd');
  const dataFormatada = data.format('DD/MM/YYYY');

  function abrirMenu(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function fecharMenu() {
    setAnchorEl(null);
  }

  function handleCancelar() {
    fecharMenu();
    onCancelar(reserva.id);
  }

  function handleReativar() {
    fecharMenu();
    onReativar(reserva.id);
  }

  function handleForcarAgendamento() {
    fecharMenu();
    onForcarAgendamento(reserva.id);
  }

  return {
    anchorEl,
    menuAberto: Boolean(anchorEl),
    diaSemana,
    dataFormatada,
    podeCancelar,
    podeReativar,
    podeForcarAgendamento,
    temAcoes,
    abrirMenu,
    fecharMenu,
    handleCancelar,
    handleReativar,
    handleForcarAgendamento,
  };
}
