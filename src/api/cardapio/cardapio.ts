import { httpClient } from 'api/httpClient';
import type { ApiSuccessResponse } from 'types/api';
import type { Cardapio } from 'types/cardapio';

async function buscarCardapio(): Promise<Cardapio[]> {
  const { data } =
    await httpClient.get<ApiSuccessResponse<Cardapio[]>>('/v1/cardapio');
  return data.data;
}

export const CardapioApi = {
  buscarCardapio,
};
