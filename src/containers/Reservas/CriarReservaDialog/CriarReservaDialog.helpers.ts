import dayjs from 'dayjs';

export function formatarDataLista(data: string) {
  const d = dayjs(data);
  const diaSemana = d.format('ddd').replace('.', '');
  return `${diaSemana.charAt(0).toUpperCase()}${diaSemana.slice(1)}, ${d.format('DD/MM/YYYY')}`;
}
