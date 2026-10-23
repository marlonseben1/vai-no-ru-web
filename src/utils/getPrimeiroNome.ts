import { capitalizar } from './capitalizar';

export function getPrimeiroNome(nomeCompleto: string) {
  const [primeiro = ''] = nomeCompleto.trim().split(/\s+/);
  return capitalizar(primeiro.toLowerCase());
}
