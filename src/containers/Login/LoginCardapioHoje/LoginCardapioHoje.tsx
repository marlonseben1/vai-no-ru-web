import { Box, Skeleton, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import dayjs from 'dayjs';
import {
  COR_BORDA,
  COR_DESTAQUE,
  COR_TEXTO,
} from 'shared/Cardapio/Cardapio.static';
import { CardapioLegenda } from 'shared/Cardapio/CardapioLegenda/CardapioLegenda';
import { CardapioMenu } from 'shared/Cardapio/CardapioMenu/CardapioMenu';
import { paletaDeCores } from 'theme/paletaDeCores';
import type { Cardapio } from 'types';
import { capitalizar } from 'utils/capitalizar';

interface LoginCardapioHojeProps {
  cardapio?: Cardapio;
}

export function LoginCardapioHoje({ cardapio }: LoginCardapioHojeProps) {
  return (
    <Box
      component="section"
      aria-label="Cardápio do dia"
      sx={{
        width: '100%',
        overflow: 'hidden',
        bgcolor: paletaDeCores.neutra[0],
        border: `1px solid ${COR_BORDA}`,
        borderRadius: '20px',
        boxShadow: `0 1px 2px ${alpha(paletaDeCores.cinza[950], 0.04)}`,
      }}
    >
      <Box sx={{ p: 4, pb: 3 }}>
        {cardapio ? (
          <>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: COR_DESTAQUE,
              }}
            >
              Próximo cardápio
            </Typography>
            <Typography
              component="h2"
              sx={{
                mt: 0.5,
                mb: 2,
                fontSize: 22,
                fontWeight: 700,
                color: COR_TEXTO,
              }}
            >
              {capitalizar(
                dayjs(cardapio.data.slice(0, 10)).format('dddd, D [de] MMMM'),
              )}
            </Typography>
            <CardapioMenu cardapio={cardapio} />
          </>
        ) : (
          <Skeleton variant="rounded" height={320} sx={{ mt: 2 }} />
        )}
      </Box>
      {cardapio && <CardapioLegenda />}
    </Box>
  );
}
