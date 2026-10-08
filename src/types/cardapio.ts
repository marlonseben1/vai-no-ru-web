import type { Refeicao } from './refeicao';

export type TipoCardapio = Refeicao;

export const CategoriaItemCardapio = {
  PratoPrincipal: 0,
  Acompanhamento: 1,
  Salada: 2,
} as const;

export type CategoriaItemCardapio =
  (typeof CategoriaItemCardapio)[keyof typeof CategoriaItemCardapio];

export const SeloCardapio = {
  Vegetariano: 0,
  OrigemAnimal: 1,
  OrigemSuina: 2,
  Lactose: 3,
  Gluten: 4,
  Ovos: 5,
} as const;

export type SeloCardapio = (typeof SeloCardapio)[keyof typeof SeloCardapio];

export interface ItemCardapio {
  nome: string;
  categoria?: CategoriaItemCardapio;
  selos?: SeloCardapio[];
}

export interface Cardapio {
  id: string;
  data: string;
  tipo: TipoCardapio;
  menuDoDia: ItemCardapio[];
  saladas: string[];
  suco: ItemCardapio[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListarCardapioParams {
  dataInicio: string;
  dataFim: string;
}
