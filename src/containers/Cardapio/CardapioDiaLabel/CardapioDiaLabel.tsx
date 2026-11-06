import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import type { Cardapio } from 'types';
import { capitalizar } from 'utils/capitalizar';
import { dataDoDia } from '../Cardapio.helpers';
import {
  COR_DESTAQUE,
  COR_TEXTO,
  COR_TEXTO_SECUNDARIO,
} from '../Cardapio.static';

interface CardapioDiaLabelProps {
  dia: Cardapio;
  hoje: string;
  selecionado: boolean;
}

export function CardapioDiaLabel({
  dia,
  hoje,
  selecionado,
}: CardapioDiaLabelProps) {
  const data = dayjs(dataDoDia(dia));
  const cor = selecionado ? COR_DESTAQUE : COR_TEXTO;

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography
        sx={{
          fontSize: 13,
          lineHeight: 1.4,
          color: selecionado ? COR_DESTAQUE : COR_TEXTO_SECUNDARIO,
        }}
      >
        {capitalizar(data.format('ddd').replace('.', ''))}
      </Typography>
      <Typography
        sx={{ fontSize: 20, fontWeight: 700, lineHeight: 1.3, color: cor }}
      >
        {data.format('DD')}
      </Typography>
      {/* espaço sempre reservado, para nenhuma aba ficar mais alta */}
      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 700,
          lineHeight: 1.4,
          color: COR_DESTAQUE,
          visibility: dataDoDia(dia) === hoje ? 'visible' : 'hidden',
        }}
      >
        HOJE
      </Typography>
    </Box>
  );
}
