import dayjs from 'dayjs';
import useIsResponsivo from 'hooks/useIsResponsivo';
import { type MouseEvent, useState } from 'react';
import { refeicoesDisponiveis } from 'shared/prazosReserva';
import type { ReservaResumo } from 'types/reserva';

interface UseReservaCardParams {
  reserva: ReservaResumo;
  onEditar: (reserva: ReservaResumo) => void;
  onCancelar: (reservaId: string) => void;
  onReativar: (reservaId: string) => void;
}

export function useReservaCard({
  reserva,
  onEditar,
  onCancelar,
  onReativar,
}: UseReservaCardParams) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isResponsivo = useIsResponsivo();

  const podeEditar =
    reserva.status === 'PENDENTE' &&
    refeicoesDisponiveis(reserva.dataReserva.slice(0, 10)).some(
      (refeicao) => refeicao !== reserva.refeicao,
    );
  const podeCancelar =
    reserva.status === 'PENDENTE' || reserva.status === 'NAO_AGENDADA';
  const podeReativar = reserva.status === 'CANCELADA';
  const temAcoes = podeEditar || podeCancelar || podeReativar;

  const data = dayjs(reserva.dataReserva.slice(0, 10));
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

  function handleEditar() {
    fecharMenu();
    onEditar(reserva);
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
    podeEditar,
    podeCancelar,
    podeReativar,
    temAcoes,
    abrirMenu,
    fecharMenu,
    handleEditar,
    handleCancelar,
    handleReativar,
  };
}
