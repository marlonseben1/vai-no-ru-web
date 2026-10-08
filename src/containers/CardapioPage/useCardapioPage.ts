import dayjs from 'dayjs';
import { useCardapioQuery } from 'queries/cardapio/useCardapioQuery';
import { useState } from 'react';
import { formatarPeriodo } from './CardapioPage.helpers';

export function useCardapioPage() {
  const [semanaOffset, setSemanaOffset] = useState(0);

  const referencia = dayjs().add(semanaOffset, 'week');
  const inicioDaSemana = referencia.day(1); // segunda-feira
  const fimDaSemana = referencia.day(5); // sexta-feira

  const cardapioQuery = useCardapioQuery({
    dataInicio: inicioDaSemana.format('YYYY-MM-DD'),
    dataFim: fimDaSemana.format('YYYY-MM-DD'),
  });

  return {
    periodo: formatarPeriodo(inicioDaSemana, fimDaSemana),
    chaveSemana: inicioDaSemana.format('YYYY-MM-DD'),
    semanaAtual: semanaOffset === 0,
    cardapioQuery,
    dias: cardapioQuery.data ?? [],
    irParaSemanaAnterior: () => setSemanaOffset((s) => s - 1),
    irParaProximaSemana: () => setSemanaOffset((s) => s + 1),
    irParaHoje: () => setSemanaOffset(0),
  };
}
