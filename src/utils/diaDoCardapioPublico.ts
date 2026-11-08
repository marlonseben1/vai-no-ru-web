import { HORARIO_LIMITE_TARDE } from 'constants/prazosReserva';
import dayjs, { type Dayjs } from 'dayjs';
import { emMinutos } from 'utils/refeicoesDisponiveis';

// cobre fim de semana e feriado: da sexta à noite até a segunda, com folga
const DIAS_DE_BUSCA = 4;
const FORMATO_DATA = 'YYYY-MM-DD';

interface JanelaDoCardapioPublico {
  dataInicio: string;
  dataFim: string;
}

// até o prazo do jantar a janela começa hoje; depois, amanhã
export function getJanelaDoCardapioPublico(
  agora: Dayjs = dayjs(),
): JanelaDoCardapioPublico {
  const minutosAgora = agora.hour() * 60 + agora.minute();
  const prazoEncerrado = minutosAgora >= emMinutos(HORARIO_LIMITE_TARDE);
  const inicio = prazoEncerrado ? agora.add(1, 'day') : agora;

  return {
    dataInicio: inicio.format(FORMATO_DATA),
    dataFim: inicio.add(DIAS_DE_BUSCA, 'day').format(FORMATO_DATA),
  };
}
