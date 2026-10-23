import dayjs from 'dayjs';
import { useEditarReservaMutation } from 'queries/reserva/useEditarReservaMutation';
import { useState } from 'react';
import { refeicoesDisponiveis } from 'shared/prazosReserva';
import { ReservasStore, useReservasStore } from 'store/reservas/reservas.store';
import type { Refeicao } from 'types/refeicao';

export function useEditarReservaDialog() {
  const {
    open: aberto,
    mode,
    reserva,
  } = useReservasStore((state) => state.cadastroReservaDialog);
  const open = aberto && mode === 'editar';
  const [refeicaoEscolhida, setRefeicaoEscolhida] = useState<Refeicao | null>(
    null,
  );
  const editarMutation = useEditarReservaMutation();

  const refeicao = refeicaoEscolhida ?? reserva?.refeicao ?? 'Almoco';
  const dataISO = reserva?.dataReserva.slice(0, 10) ?? '';
  const dataFormatada = dataISO ? dayjs(dataISO).format('DD/MM/YYYY') : '';
  const opcoes = dataISO ? refeicoesDisponiveis(dataISO) : [];
  const alterou = reserva !== undefined && refeicao !== reserva.refeicao;

  function onClose() {
    ReservasStore.setCadastroReservaDialog(null);
  }

  function handleSalvar() {
    if (!reserva || !alterou) return;
    editarMutation.mutate(
      { reservaId: reserva.id, refeicao },
      { onSuccess: onClose },
    );
  }

  function handleExited() {
    setRefeicaoEscolhida(null);
    editarMutation.reset();
  }

  return {
    open,
    opcoes,
    onClose,
    alterou,
    refeicao,
    handleSalvar,
    handleExited,
    dataFormatada,
    editarMutation,
    setRefeicaoEscolhida,
  };
}
