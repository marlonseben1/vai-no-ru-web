import dayjs, { type Dayjs } from 'dayjs';
import { REFEICAO_VALUES, type Refeicao } from 'types/refeicao';

// horário em que o servidor envia as reservas do dia ao RU
export const HORARIO_LIMITE_MANHA = '09:30';
export const HORARIO_LIMITE_TARDE = '15:30';

function emMinutos(horario: string) {
  const [hora = 0, minuto = 0] = horario.split(':').map(Number);
  return hora * 60 + minuto;
}

// almoço (e almoço + jantar) é enviado pela manhã; só jantar, à tarde
export function refeicoesDisponiveis(
  data: string,
  agora: Dayjs = dayjs(),
): readonly Refeicao[] {
  if (data !== agora.format('YYYY-MM-DD')) return REFEICAO_VALUES;

  const minutosAgora = agora.hour() * 60 + agora.minute();
  const manhaAberta = minutosAgora < emMinutos(HORARIO_LIMITE_MANHA);
  const tardeAberta = minutosAgora < emMinutos(HORARIO_LIMITE_TARDE);

  return REFEICAO_VALUES.filter((refeicao) =>
    refeicao === 'Jantar' ? tardeAberta : manhaAberta,
  );
}
