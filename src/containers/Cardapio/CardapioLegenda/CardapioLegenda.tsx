import { Box, Typography } from '@mui/material';
import {
  COR_BORDA,
  COR_FUNDO_LEGENDA,
  COR_TEXTO_SECUNDARIO,
  ORDEM_SELOS,
  SELOS_CARDAPIO,
} from '../Cardapio.static';
import { CardapioSelo } from '../CardapioSelo/CardapioSelo';

export function CardapioLegenda() {
  return (
    <Box
      sx={{
        display: { xs: 'grid', sm: 'flex' },
        gridTemplateColumns: 'repeat(2, 1fr)',
        flexWrap: 'wrap',
        columnGap: { xs: 2, sm: 4 },
        rowGap: { xs: 1.5, sm: 1.5 },
        px: { xs: 2, sm: 4 },
        py: 2.5,
        bgcolor: COR_FUNDO_LEGENDA,
        borderTop: `1px solid ${COR_BORDA}`,
      }}
    >
      {ORDEM_SELOS.map((selo) => (
        <Box key={selo} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CardapioSelo selo={selo} />
          <Typography
            sx={{
              fontSize: { xs: 13, sm: 14 },
              color: COR_TEXTO_SECUNDARIO,
            }}
          >
            {SELOS_CARDAPIO[selo].texto}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
