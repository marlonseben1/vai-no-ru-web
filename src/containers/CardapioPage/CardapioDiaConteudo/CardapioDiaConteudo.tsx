import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import type { Cardapio } from 'types/cardapio';
import { capitalizar } from 'utils/capitalizar';
import { CardapioMenu } from '../CardapioMenu/CardapioMenu';
import { dataDoDia } from '../CardapioPage.helpers';

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
