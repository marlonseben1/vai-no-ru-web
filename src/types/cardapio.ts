import type { Refeicao } from './refeicao';

export type TipoCardapio = Refeicao;

export interface ItemCardapio {
  nome: string;
}

export interface Cardapio {
  id: string;
  data: string;
  tipo: TipoCardapio;
  menuDoDia: ItemCardapio[];
  saladas: string[];
  suco: string;
  createdAt: string;
  updatedAt: string;
}
