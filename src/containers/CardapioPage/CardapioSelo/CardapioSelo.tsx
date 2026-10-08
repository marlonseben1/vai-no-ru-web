import { Box } from '@mui/material';
import { colorPalette } from 'theme/colorPalette';
import { SeloCardapio } from 'types/cardapio';
import { SELOS_CARDAPIO } from '../CardapioPage.static';

interface CardapioSeloProps {
  selo: SeloCardapio;
}

export function CardapioSelo({ selo }: CardapioSeloProps) {
  const { letra, texto, cor } = SELOS_CARDAPIO[selo];

  return (
    <Box
      component="span"
      title={texto}
      aria-label={texto}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        flexShrink: 0,
        boxSizing: 'border-box',
        border: `1px solid ${
          selo === SeloCardapio.Vegetariano
            ? colorPalette.success.main
            : colorPalette.neutral[300]
        }`,
        borderRadius: 1,
        color: cor,
        fontSize: 12,
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {letra}
    </Box>
  );
}
