import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import type { Cardapio } from 'types/cardapio';
import { capitalizar } from 'utils/capitalizar';
import { dataDoDia } from '../CardapioPage.helpers';

interface CardapioDiaLabelProps {
  dia: Cardapio;
  hoje: string;
}

export function CardapioDiaLabel({ dia, hoje }: CardapioDiaLabelProps) {
  const data = dayjs(dataDoDia(dia));

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography variant="caption" sx={{ textTransform: 'none' }}>
        {capitalizar(data.format('ddd').replace('.', ''))}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
        {data.format('DD')}
      </Typography>
      {dataDoDia(dia) === hoje && (
        <Typography
          variant="caption"
          sx={{ fontWeight: 700, fontSize: 10, color: 'primary.dark' }}
        >
          HOJE
        </Typography>
      )}
    </Box>
  );
}
