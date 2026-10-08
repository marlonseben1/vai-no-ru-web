import { Box, Typography } from '@mui/material';
import { colorPalette } from 'theme/colorPalette';
import { ORDEM_SELOS, SELOS_CARDAPIO } from '../CardapioPage.static';
import { CardapioSelo } from '../CardapioSelo/CardapioSelo';

export function CardapioLegenda() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: { xs: 1.5, sm: 3 },
        px: 4,
        py: 2.5,
        bgcolor: colorPalette.neutral[50],
        borderTop: `1px solid ${colorPalette.neutral[200]}`,
      }}
    >
      {ORDEM_SELOS.map((selo) => (
        <Box key={selo} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CardapioSelo selo={selo} />
          <Typography variant="body2" color={colorPalette.neutral[700]}>
            {SELOS_CARDAPIO[selo].texto}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
