import { LABEL_REFEICAO } from 'constants/labels';
import dayjs from 'dayjs';
import type { ReservaDiaInput } from 'types';

export function resumirReservas(dias: ReservaDiaInput[]) {
  const datas = dias.map((dia) => dia.data).sort();
  const primeira = dayjs(datas[0]);
  const ultima = dayjs(datas[datas.length - 1]);

  return {
    periodo: `${primeira.format('DD/MM')} – ${ultima.format('DD/MM')}`,
    almocos: dias.filter((dia) => dia.refeicao !== 'Jantar').length,
    jantares: dias.filter((dia) => dia.refeicao !== 'Almoco').length,
  };
}

export function formatarDataPorExtenso(data: string) {
  const texto = dayjs(data).format('dddd, DD/MM/YYYY');
  return `${texto.charAt(0).toUpperCase()}${texto.slice(1)}`;
}

export function montarTextosAviso(dias: ReservaDiaInput[]) {
  const [unica] = dias;
  const plural = dias.length > 1;

  return {
    plural,
    titulo: plural ? 'Reservas aguardando envio' : 'Reserva aguardando envio',
    subtitulo:
      !plural && unica
        ? `${formatarDataPorExtenso(unica.data)} · ${LABEL_REFEICAO[unica.refeicao]}`
        : `${dias.length} reservas`,
    cancelamento: plural
      ? 'Você pode cancelar cada reserva enquanto ela ainda estiver pendente.'
      : 'Você pode cancelar a reserva enquanto ela ainda estiver pendente.',
  };
}
