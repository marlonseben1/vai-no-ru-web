import { httpClient } from 'api/httpClient';
import type { ApiSuccessResponse, Cardapio, ListarCardapioParams } from 'types';

async function buscarCardapio(
  params: ListarCardapioParams,
): Promise<Cardapio[]> {
  const { data } = await httpClient.get<ApiSuccessResponse<Cardapio[]>>(
    '/v1/cardapio',
    { params },
  );
  return data.data;
}

export const CardapioApi = {
  buscarCardapio,
};
