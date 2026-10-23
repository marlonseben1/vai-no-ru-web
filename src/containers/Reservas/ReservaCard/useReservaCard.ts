import dayjs from 'dayjs';
import useIsResponsivo from 'hooks/useIsResponsivo';
import { type MouseEvent, useState } from 'react';
import type { ReservaResumo } from 'types/reserva';
import {
  podeCancelarReserva,
  podeEditarReserva,
  podeForcarAgendamentoReserva,
  podeReativarReserva,
} from './ReservaCard.rules';
import { useReservaAcoes } from './useReservaAcoes';

interface UseReservaCardParams {
  reserva: ReservaResumo;
}

export function useReservaCard({ reserva }: UseReservaCardParams) {
  const acoes = useReservaAcoes(reserva);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isResponsivo = useIsResponsivo();

  const podeEditar = podeEditarReserva(reserva);
  const podeCancelar = podeCancelarReserva(reserva);
  const podeReativar = podeReativarReserva(reserva);
  const podeForcarAgendamento = podeForcarAgendamentoReserva(reserva);
  const temAcoes = podeEditar || podeCancelar || podeReativar;

  const dataIso = reserva.dataReserva.slice(0, 10);
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

  function handleEditar() {
    fecharMenu();
    acoes.handleEditar();
  }

  function handleCancelar() {
    fecharMenu();
    acoes.handleCancelar();
  }

  function handleReativar() {
    fecharMenu();
    acoes.handleReativar();
  }

  function handleForcarAgendamento() {
    fecharMenu();
    acoes.handleForcarAgendamento();
  }

  return {
    anchorEl,
    temAcoes,
    diaSemana,
    abrirMenu,
    podeEditar,
    fecharMenu,
    podeCancelar,
    podeReativar,
    handleEditar,
    dataFormatada,
    handleCancelar,
    handleReativar,
    podeForcarAgendamento,
    handleForcarAgendamento,
    menuAberto: Boolean(anchorEl),
    isProcessando: acoes.isProcessando,
  };
}
