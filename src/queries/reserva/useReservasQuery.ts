import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ReservaApi } from 'api/reserva/reserva';
import { queryKeys } from 'queries/queryKeys';
import type { ListarReservasParams } from 'types/reserva';

export function useReservasQuery(params: ListarReservasParams = {}) {
  return useQuery({
    queryKey: queryKeys.reservas.list(params),
    queryFn: () => ReservaApi.listarReservas(params),
    placeholderData: keepPreviousData,
  });
}
