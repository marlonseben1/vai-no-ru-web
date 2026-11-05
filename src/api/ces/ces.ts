import { httpClient } from 'api/httpClient';
import type {
  ApiSuccessResponse,
  CesElegibilidade,
  RegistrarCesInput,
} from 'types';

async function getPodeMostrarCes(): Promise<CesElegibilidade> {
  const { data } =
    await httpClient.get<ApiSuccessResponse<CesElegibilidade>>('/v1/ces');
  return data.data;
}

async function registrar(input: RegistrarCesInput): Promise<void> {
  await httpClient.post('/v1/ces', input);
}

export const CesApi = {
  getPodeMostrarCes,
  registrar,
};
