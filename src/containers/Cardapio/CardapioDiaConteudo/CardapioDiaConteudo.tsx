import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import type { Cardapio } from 'types';
import { capitalizar } from 'utils/capitalizar';
import { dataDoDia } from '../Cardapio.helpers';
import { CardapioMenu } from '../CardapioMenu/CardapioMenu';

interface CardapioDiaConteudoProps {
  dia: Cardapio;
}

export function CardapioDiaConteudo({ dia }: CardapioDiaConteudoProps) {
  return (
    <>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        {capitalizar(dayjs(dataDoDia(dia)).format('dddd, D [de] MMMM'))}
      </Typography>
      <CardapioMenu cardapio={dia} />
    </>
  );
}
