import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import type { Cardapio } from 'types';
import { capitalizar } from 'utils/capitalizar';
import { dataDoDia } from '../Cardapio.helpers';
import { COR_TEXTO } from '../Cardapio.static';
import { CardapioMenu } from '../CardapioMenu/CardapioMenu';

interface CardapioDiaConteudoProps {
  dia: Cardapio;
}

export function CardapioDiaConteudo({ dia }: CardapioDiaConteudoProps) {
  return (
    <>
      <Typography
        component="h2"
        sx={{ mb: 2.5, fontSize: 18, fontWeight: 500, color: COR_TEXTO }}
      >
        {capitalizar(dayjs(dataDoDia(dia)).format('dddd, D [de] MMMM'))}
      </Typography>
      <CardapioMenu cardapio={dia} />
    </>
  );
}
