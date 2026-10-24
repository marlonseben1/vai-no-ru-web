export const NOTAS_CES = [1, 2, 3, 4, 5] as const;

export type NotaCes = (typeof NOTAS_CES)[number];

export type ContextoCes = 'primeira_reserva';

export interface RegistrarCesInput {
  contexto: ContextoCes;
  /** `null` quando o usuário fecha a pesquisa sem avaliar */
  nota: NotaCes | null;
  comentario: string | null;
}

export interface CesElegibilidade {
  exibirPesquisa: boolean;
}
