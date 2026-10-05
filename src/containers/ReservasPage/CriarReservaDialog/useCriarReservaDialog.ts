import dayjs, { type Dayjs } from 'dayjs';
import { useCriarReservasMutation } from 'queries/reserva/useCriarReservasMutation';
import { useReservasQuery } from 'queries/reserva/useReservasQuery';
import { useMemo, useState } from 'react';
import { refeicoesDisponiveis } from 'shared/prazosReserva';
import type { Refeicao } from 'types/refeicao';
import type { ReservaDiaInput } from 'types/reserva';
import { abrirAvisoPendente } from '../AvisoPendente/avisoPendente';

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
  // oferece aplicar última refeição escolhida manualmente para todos os dias
  const [refeicaoParaTodos, setRefeicaoParaTodos] = useState<Refeicao | null>(
    null,
  );
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

  const mostrarAplicarParaTodos =
    refeicaoParaTodos !== null &&
    dias.length > 1 &&
    dias.some(
      (dia) =>
        dia.refeicao !== refeicaoParaTodos &&
        refeicoesDisponiveis(dia.data).includes(refeicaoParaTodos),
    );

  function desabilitarData(data: Dayjs): boolean {
    const diaSemana = data.day();
    const dataISO = data.format('YYYY-MM-DD');
    return (
      diaSemana === 0 ||
      diaSemana === 6 ||
      diasBloqueados.includes(dataISO) ||
      refeicoesDisponiveis(dataISO).length === 0
    );
  }

  function handleToggleData(data: Dayjs | null) {
    if (!data) return;
    const dataISO = data.format('YYYY-MM-DD');

    if (dias.some((dia) => dia.data === dataISO)) {
      setDias(dias.filter((dia) => dia.data !== dataISO));
    } else {
      const refeicao = refeicoesDisponiveis(dataISO)[0] ?? 'Almoco';
      setDias(ordenarPorData([...dias, { data: dataISO, refeicao }]));
    }
  }

  function handleTrocarRefeicao(data: string, refeicao: Refeicao) {
    setDias(
      dias.map((dia) => (dia.data === data ? { ...dia, refeicao } : dia)),
    );
    setRefeicaoParaTodos(refeicao);
  }

  // dias em que a refeição já encerrou o prazo (hoje) mantêm o valor atual
  function handleAplicarRefeicaoParaTodos() {
    if (!refeicaoParaTodos) return;
    setDias(
      dias.map((dia) =>
        refeicoesDisponiveis(dia.data).includes(refeicaoParaTodos)
          ? { ...dia, refeicao: refeicaoParaTodos }
          : dia,
      ),
    );
    setRefeicaoParaTodos(null);
  }

  function handleRemover(data: string) {
    setDias(dias.filter((dia) => dia.data !== data));
  }

  function handleReservar() {
    // o total só chega a 0 para quem nunca reservou (reservas canceladas continuam contando)
    const ehPrimeiraReserva = reservasQuery.data?.total === 0;

    criarReservasMutation.mutate(
      { dias },
      {
        onSuccess: () => {
          onClose();
          if (ehPrimeiraReserva) abrirAvisoPendente();
        },
      },
    );
  }

  // só limpa depois da animação de saída, para o conteúdo não "piscar"
  function handleExited() {
    setDias([]);
    setRefeicaoParaTodos(null);
    criarReservasMutation.reset();
  }

  return {
    dias,
    diasSelecionados,
    diasBloqueados,
    criarReservasMutation,
    desabilitarData,
    handleToggleData,
    refeicaoParaTodos,
    mostrarAplicarParaTodos,
    handleTrocarRefeicao,
    handleAplicarRefeicaoParaTodos,
    handleRemover,
    handleReservar,
    handleExited,
  };
}
