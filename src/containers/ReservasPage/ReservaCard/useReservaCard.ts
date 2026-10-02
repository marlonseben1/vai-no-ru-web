import dayjs from 'dayjs';
import useIsResponsivo from 'hooks/useIsResponsivo';
import { type MouseEvent, useState } from 'react';
import type { ReservaResumo } from 'types/reserva';

interface UseReservaCardParams {
  reserva: ReservaResumo;
  onCancelar: (reservaId: string) => void;
  onReativar: (reservaId: string) => void;
}

export function useReservaCard({
  reserva,
  onCancelar,
  onReativar,
}: UseReservaCardParams) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isResponsivo = useIsResponsivo();

  const podeCancelar =
    reserva.status === 'PENDENTE' || reserva.status === 'NAO_AGENDADA';
  const podeReativar = reserva.status === 'CANCELADA';
  const temAcoes = podeCancelar || podeReativar;

  const data = dayjs(reserva.dataReserva);
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

  return {
    anchorEl,
    menuAberto: Boolean(anchorEl),
    diaSemana,
    dataFormatada,
    podeCancelar,
    podeReativar,
    temAcoes,
    abrirMenu,
    fecharMenu,
    handleCancelar,
    handleReativar,
  };
}
