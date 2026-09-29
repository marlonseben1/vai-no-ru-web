import { httpClient } from 'api/httpClient';
import type { ApiSuccessResponse } from 'types/api';
import type {
  CriarReservasInput,
  ListarReservasParams,
  ListarReservasResponse,
  Reserva,
  ReservaHistoricoItem,
} from 'types/reserva';

async function criarReservas(input: CriarReservasInput): Promise<Reserva[]> {
  const { data } = await httpClient.post<ApiSuccessResponse<Reserva[]>>(
    '/v1/reservas',
    input,
  );
  return data.data;
}

async function listarReservas(
  params: ListarReservasParams,
): Promise<ListarReservasResponse> {
  const { data } = await httpClient.get<
    ApiSuccessResponse<ListarReservasResponse>
  >('/v1/reservas', { params });
  return data.data;
}

async function cancelarReserva(reservaId: string): Promise<void> {
  await httpClient.delete(`/v1/reservas/${reservaId}`);
}

async function reativarReserva(reservaId: string): Promise<void> {
  await httpClient.put(`/v1/reservas/${reservaId}`);
}

async function buscarHistoricoReserva(
  reservaId: string,
): Promise<ReservaHistoricoItem[]> {
  const { data } = await httpClient.get<
    ApiSuccessResponse<ReservaHistoricoItem[]>
  >(`/v1/reservas/${reservaId}/historico`);
  return data.data;
}

export const ReservaApi = {
  criarReservas,
  listarReservas,
  cancelarReserva,
  reativarReserva,
  buscarHistoricoReserva,
};
