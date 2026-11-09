import { paletaDeCores } from 'theme/paletaDeCores';
import { SeloCardapio } from 'types';

export const COR_TEXTO = paletaDeCores.cinza[950];
export const COR_TEXTO_SECUNDARIO = paletaDeCores.cinza[800];
export const COR_BORDA = paletaDeCores.cinza[300];
export const COR_DESTAQUE = paletaDeCores.turquesa[600];
export const COR_VEGETARIANO = paletaDeCores.verde[600];
export const COR_BORDA_SELO = paletaDeCores.cinza[700];
export const COR_FUNDO_LEGENDA = paletaDeCores.cinza[50];

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
