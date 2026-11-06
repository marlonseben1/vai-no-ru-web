import dayjs from 'dayjs';
import type { ReservaResumo } from 'types';

function getDataIso(reserva: ReservaResumo) {
  return reserva.dataReserva.slice(0, 10);
}

// próximas (hoje em diante) da mais perto para a mais longe; anteriores da mais recente para a mais antiga
export function separarReservas(reservas: ReservaResumo[]) {
  const hoje = dayjs().format('YYYY-MM-DD');
  const ordenar = (a: ReservaResumo, b: ReservaResumo) =>
    getDataIso(a).localeCompare(getDataIso(b));

  return {
    proximas: reservas.filter((r) => getDataIso(r) >= hoje).sort(ordenar),
    anteriores: reservas
      .filter((r) => getDataIso(r) < hoje)
      .sort((a, b) => ordenar(b, a)),
  };
}
