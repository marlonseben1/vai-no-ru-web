import type { Perfil } from './perfil';

export type OrigemConta = 'UPF' | 'CONVIDADO';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: Perfil | null;
  matricula: string | null;
  origem: OrigemConta;
}
