import type { Dayjs } from 'dayjs';
import { refeicoesDisponiveis } from 'shared/prazosReserva';
import type { Refeicao } from 'types/refeicao';
import type { ReservaDiaInput } from 'types/reserva';

export function isDataDesabilitada(data: Dayjs, diasBloqueados: string[]) {
  const diaSemana = data.day();
  const dataISO = data.format('YYYY-MM-DD');
  return (
    diaSemana === 0 ||
    diaSemana === 6 ||
    diasBloqueados.includes(dataISO) ||
    refeicoesDisponiveis(dataISO).length === 0
  );
}

export function deveMostrarAplicarParaTodos(
  dias: ReservaDiaInput[],
  refeicaoParaTodos: Refeicao | null,
) {
  return (
    refeicaoParaTodos !== null &&
    dias.length > 1 &&
    dias.some(
      (dia) =>
        dia.refeicao !== refeicaoParaTodos &&
        refeicoesDisponiveis(dia.data).includes(refeicaoParaTodos),
    )
  );
}
