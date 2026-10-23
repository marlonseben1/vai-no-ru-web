import dayjs from 'dayjs';
import { useEditarReservaMutation } from 'queries/reserva/useEditarReservaMutation';
import { useState } from 'react';
import { refeicoesDisponiveis } from 'shared/prazosReserva';
import type { Refeicao } from 'types/refeicao';
import type { ReservaResumo } from 'types/reserva';

interface UseEditarReservaDialogParams {
  reserva: ReservaResumo | null;
  onClose: () => void;
}

export function useEditarReservaDialog({
  reserva,
  onClose,
}: UseEditarReservaDialogParams) {
  const [refeicaoEscolhida, setRefeicaoEscolhida] = useState<Refeicao | null>(
    null,
  );
  const editarMutation = useEditarReservaMutation();

  const refeicao = refeicaoEscolhida ?? reserva?.refeicao ?? 'Almoco';
  const dataISO = reserva?.dataReserva.slice(0, 10) ?? '';
  const dataFormatada = dataISO ? dayjs(dataISO).format('DD/MM/YYYY') : '';
  const opcoes = dataISO ? refeicoesDisponiveis(dataISO) : [];
  const alterou = reserva !== null && refeicao !== reserva.refeicao;

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
    refeicao,
    dataFormatada,
    opcoes,
    alterou,
    editarMutation,
    setRefeicaoEscolhida,
    handleSalvar,
    handleExited,
  };
}
