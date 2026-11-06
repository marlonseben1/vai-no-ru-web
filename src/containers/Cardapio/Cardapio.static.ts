import { SeloCardapio } from 'types';

export const COR_TEXTO = '#1F2A2A';
export const COR_TEXTO_SECUNDARIO = '#4A5453';
export const COR_BORDA = '#E3E8E8';
export const COR_DESTAQUE = '#3F706B';
export const COR_VEGETARIANO = '#1E6B3F';
export const COR_BORDA_SELO = '#7C8786';
export const COR_FUNDO_LEGENDA = '#F3F6F6';

// largura máxima do conteúdo no desktop, para os selos não ficarem longe dos nomes
export const LARGURA_MAXIMA_CARDAPIO = 880;

interface SeloInfo {
  letra: string;
  texto: string;
}

export const SELOS_CARDAPIO: Record<SeloCardapio, SeloInfo> = {
  [SeloCardapio.Vegetariano]: { letra: 'V', texto: 'Vegetariano' },
  [SeloCardapio.OrigemAnimal]: { letra: 'A', texto: 'Origem animal' },
  [SeloCardapio.OrigemSuina]: { letra: 'S', texto: 'Origem suína' },
  [SeloCardapio.Lactose]: { letra: 'L', texto: 'Lactose' },
  [SeloCardapio.Gluten]: { letra: 'G', texto: 'Glúten' },
  [SeloCardapio.Ovos]: { letra: 'O', texto: 'Ovos' },
};

export const ORDEM_SELOS: SeloCardapio[] = [
  SeloCardapio.Vegetariano,
  SeloCardapio.OrigemAnimal,
  SeloCardapio.OrigemSuina,
  SeloCardapio.Lactose,
  SeloCardapio.Gluten,
  SeloCardapio.Ovos,
];
