import { ApiError } from 'api/ApiError';
import { httpClient } from 'api/httpClient';
import type { ApiSuccessResponse } from 'types/api';
import type { Perfil } from 'types/perfil';
import type { Usuario } from 'types/usuario';

interface LoginInput {
  token: string;
  aceitarPolitica?: boolean;
}

async function loginComGoogle(input: LoginInput): Promise<Usuario> {
  const { data } = await httpClient.post<
    ApiSuccessResponse<{ usuario: Usuario }>
  >('/v1/auth/google', input);
  return data.data.usuario;
}

interface OnboardingInput {
  nome: string;
  perfil: Perfil;
  matricula?: string;
}

async function concluirOnboarding(input: OnboardingInput): Promise<Usuario> {
  const { data } = await httpClient.post<
    ApiSuccessResponse<{ usuario: Usuario }>
  >('/v1/auth/onboarding', input);
  return data.data.usuario;
}

async function buscarUsuarioAtual(): Promise<Usuario | null> {
  try {
    const { data } =
      await httpClient.get<ApiSuccessResponse<{ usuario: Usuario }>>(
        '/v1/auth/me',
      );
    return data.data.usuario;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }
    throw error;
  }
}

async function logout(): Promise<void> {
  await httpClient.post('/v1/auth/logout');
}

export const AuthApi = {
  loginComGoogle,
  concluirOnboarding,
  buscarUsuarioAtual,
  logout,
};
