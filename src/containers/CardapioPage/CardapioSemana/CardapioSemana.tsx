import { Paper } from '@mui/material';
import { CustomTabs, type TabItem } from 'components/CustomTabs/CustomTabs';
import dayjs from 'dayjs';
import { colorPalette } from 'theme/colorPalette';
import type { Cardapio } from 'types/cardapio';
import { CardapioDiaConteudo } from '../CardapioDiaConteudo/CardapioDiaConteudo';
import { CardapioDiaLabel } from '../CardapioDiaLabel/CardapioDiaLabel';
import { CardapioLegenda } from '../CardapioLegenda/CardapioLegenda';
import { dataDoDia } from '../CardapioPage.helpers';

interface CardapioSemanaProps {
  dias: Cardapio[];
}

export function CardapioSemana({ dias }: CardapioSemanaProps) {
  const hoje = dayjs().format('YYYY-MM-DD');
  const indiceHoje = dias.findIndex((dia) => dataDoDia(dia) === hoje);

  const tabs: TabItem[] = dias.map((dia) => ({
    id: dia.id,
    label: <CardapioDiaLabel dia={dia} hoje={hoje} />,
    children: <CardapioDiaConteudo dia={dia} />,
  }));

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        overflow: 'hidden',
        border: `1px solid ${colorPalette.neutral[200]}`,
        borderRadius: 4,
      }}
    >
      <CustomTabs tabs={tabs} indiceInicial={Math.max(indiceHoje, 0)} />
      <CardapioLegenda />
    </Paper>
  );
}
