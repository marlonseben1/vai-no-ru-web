import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import type { UseQueryResult } from '@tanstack/react-query';
import type { Cardapio } from 'types/cardapio';
import { CardapioSemana } from '../CardapioSemana/CardapioSemana';

interface CardapioConteudoProps {
  cardapioQuery: UseQueryResult<Cardapio[]>;
  dias: Cardapio[];
}

export function CardapioConteudo({
  cardapioQuery,
  dias,
}: CardapioConteudoProps) {
  const { isPending, isError, error } = cardapioQuery;

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  if (dias.length === 0) {
    return (
      <Typography color="text.secondary" align="center" sx={{ p: 4 }}>
        Nenhum cardápio disponível para esta semana.
      </Typography>
    );
  }

  return <CardapioSemana dias={dias} />;
}
