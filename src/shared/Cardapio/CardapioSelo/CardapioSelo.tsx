import { Box } from '@mui/material';
import { SeloCardapio } from 'types';
import {
  COR_BORDA_SELO,
  COR_TEXTO,
  COR_VEGETARIANO,
  SELOS_CARDAPIO,
} from '../Cardapio.static';

interface CardapioSeloProps {
  selo: SeloCardapio;
}

export function CardapioSelo({ selo }: CardapioSeloProps) {
  const { letra, texto } = SELOS_CARDAPIO[selo];
  const cor = selo === SeloCardapio.Vegetariano ? COR_VEGETARIANO : COR_TEXTO;

  return (
    <Box
      component="span"
      title={texto}
      aria-label={texto}
      role="img"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        flexShrink: 0,
        boxSizing: 'border-box',
        border: `1px solid ${
          selo === SeloCardapio.Vegetariano ? COR_VEGETARIANO : COR_BORDA_SELO
        }`,
        borderRadius: '6px',
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
