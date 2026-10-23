import dayjs, { type Dayjs } from 'dayjs';
import { PostHogAnalytics } from 'lib/posthog';
import { useCriarReservasMutation } from 'queries/reserva/useCriarReservasMutation';
import { useReservasQuery } from 'queries/reserva/useReservasQuery';
import { useMemo, useState } from 'react';
import { refeicoesDisponiveis } from 'shared/prazosReserva';
import { ReservasStore, useReservasStore } from 'store/reservas/reservas.store';
import type { Refeicao } from 'types/refeicao';
import type { ReservaDiaInput } from 'types/reserva';
import { abrirAvisoPendente } from '../AvisoPendente/avisoPendente';
import {
  deveMostrarAplicarParaTodos,
  isDataDesabilitada,
} from './CriarReservaDialog.rules';

function ordenarPorData(dias: ReservaDiaInput[]) {
  return [...dias].sort((a, b) => a.data.localeCompare(b.data));
}

export function useCriarReservaDialog() {
  const open = useReservasStore(
    ({ cadastroReservaDialog }) =>
      cadastroReservaDialog.open && cadastroReservaDialog.mode === 'criar',
  );

  function onClose() {
    ReservasStore.setCadastroReservaDialog(null);
  }

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

  // datas com reserva não cancelada: o servidor ignora essas datas (canceladas são reativadas)
  const diasBloqueados = useMemo(() => {
    const hoje = dayjs().format('YYYY-MM-DD');
    return (reservasQuery.data?.data ?? [])
      .filter((reserva) => reserva.status !== 'CANCELADA')
      .map((reserva) => reserva.dataReserva.slice(0, 10))
      .filter((data) => data >= hoje);
  }, [reservasQuery.data]);

  const diasSelecionados = useMemo(() => dias.map((dia) => dia.data), [dias]);

  const mostrarAplicarParaTodos = deveMostrarAplicarParaTodos(
    dias,
    refeicaoParaTodos,
  );

  function desabilitarData(data: Dayjs): boolean {
    return isDataDesabilitada(data, diasBloqueados);
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
          if (ehPrimeiraReserva) {
            PostHogAnalytics.capturar('reserva_primeira_reserva');
            PostHogAnalytics.forcarGravacao();
            abrirAvisoPendente();
          }
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
    open,
    dias,
    onClose,
    handleExited,
    handleRemover,
    diasBloqueados,
    handleReservar,
    desabilitarData,
    diasSelecionados,
    handleToggleData,
    refeicaoParaTodos,
    handleTrocarRefeicao,
    criarReservasMutation,
    mostrarAplicarParaTodos,
    handleAplicarRefeicaoParaTodos,
  };
}
