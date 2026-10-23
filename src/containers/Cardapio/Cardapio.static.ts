import { colorPalette } from 'theme/colorPalette';
import { SeloCardapio } from 'types/cardapio';

interface SeloInfo {
  letra: string;
  texto: string;
  cor: string;
}

export const SELOS_CARDAPIO: Record<SeloCardapio, SeloInfo> = {
  [SeloCardapio.Vegetariano]: {
    letra: 'V',
    texto: 'Vegetariano',
    cor: colorPalette.success.dark,
  },
  [SeloCardapio.OrigemAnimal]: {
    letra: 'A',
    texto: 'Origem animal',
    cor: colorPalette.neutral[700],
  },
  [SeloCardapio.OrigemSuina]: {
    letra: 'S',
    texto: 'Origem suína',
    cor: colorPalette.neutral[700],
  },
  [SeloCardapio.Lactose]: {
    letra: 'L',
    texto: 'Lactose',
    cor: colorPalette.neutral[700],
  },
  [SeloCardapio.Gluten]: {
    letra: 'G',
    texto: 'Glúten',
    cor: colorPalette.neutral[700],
  },
  [SeloCardapio.Ovos]: {
    letra: 'O',
    texto: 'Ovos',
    cor: colorPalette.neutral[700],
  },
};

export const ORDEM_SELOS: SeloCardapio[] = [
  SeloCardapio.Vegetariano,
  SeloCardapio.OrigemAnimal,
  SeloCardapio.OrigemSuina,
  SeloCardapio.Lactose,
  SeloCardapio.Gluten,
  SeloCardapio.Ovos,
];
