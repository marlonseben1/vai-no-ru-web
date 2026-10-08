import { httpClient } from 'api/httpClient';
import type { ApiSuccessResponse } from 'types/api';
import type { Cardapio, ListarCardapioParams } from 'types/cardapio';

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
