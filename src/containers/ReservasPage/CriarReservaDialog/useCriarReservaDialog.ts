import dayjs, { type Dayjs } from 'dayjs';
import { useCriarReservasMutation } from 'queries/reserva/useCriarReservasMutation';
import { useReservasQuery } from 'queries/reserva/useReservasQuery';
import { useMemo, useState } from 'react';
import type { Refeicao } from 'types/refeicao';
import type { ReservaDiaInput } from 'types/reserva';

interface UseCriarReservaDialogParams {
  onClose: () => void;
}

function ordenarPorData(dias: ReservaDiaInput[]) {
  return [...dias].sort((a, b) => a.data.localeCompare(b.data));
}

export function useCriarReservaDialog({
  onClose,
}: UseCriarReservaDialogParams) {
  const [dias, setDias] = useState<ReservaDiaInput[]>([]);
  const criarReservasMutation = useCriarReservasMutation();
  const reservasQuery = useReservasQuery({
    pageSize: 100,
    sort: 'dataReserva',
    order: 'desc',
  });

  // datas que já têm reserva (qualquer status): o servidor ignora essas datas
  const diasBloqueados = useMemo(() => {
    const hoje = dayjs().format('YYYY-MM-DD');
    return (reservasQuery.data?.data ?? [])
      .map((reserva) => reserva.dataReserva.slice(0, 10))
      .filter((data) => data >= hoje);
  }, [reservasQuery.data]);

  const diasSelecionados = useMemo(() => dias.map((dia) => dia.data), [dias]);

  function desabilitarData(data: Dayjs): boolean {
    const diaSemana = data.day();
    return (
      diaSemana === 0 ||
      diaSemana === 6 ||
      diasBloqueados.includes(data.format('YYYY-MM-DD'))
    );
  }

  function handleToggleData(data: Dayjs | null) {
    if (!data) return;
    const dataISO = data.format('YYYY-MM-DD');

    if (dias.some((dia) => dia.data === dataISO)) {
      setDias(dias.filter((dia) => dia.data !== dataISO));
    } else {
      setDias(ordenarPorData([...dias, { data: dataISO, refeicao: 'Almoco' }]));
    }
  }

  function handleTrocarRefeicao(data: string, refeicao: Refeicao) {
    setDias(
      dias.map((dia) => (dia.data === data ? { ...dia, refeicao } : dia)),
    );
  }

  function handleRemover(data: string) {
    setDias(dias.filter((dia) => dia.data !== data));
  }

  function handleReservar() {
    criarReservasMutation.mutate({ dias }, { onSuccess: onClose });
  }

  // só limpa depois da animação de saída, para o conteúdo não "piscar"
  function handleExited() {
    setDias([]);
    criarReservasMutation.reset();
  }

  return {
    dias,
    diasSelecionados,
    diasBloqueados,
    criarReservasMutation,
    desabilitarData,
    handleToggleData,
    handleTrocarRefeicao,
    handleRemover,
    handleReservar,
    handleExited,
  };
}
