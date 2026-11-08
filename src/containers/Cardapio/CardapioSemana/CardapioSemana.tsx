import { Box, Paper } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { dataDoDia } from 'shared/Cardapio/Cardapio.helpers';
import { COR_BORDA } from 'shared/Cardapio/Cardapio.static';
import { CardapioLegenda } from 'shared/Cardapio/CardapioLegenda/CardapioLegenda';
import { paletaDeCores } from 'theme/paletaDeCores';
import type { Cardapio } from 'types';
import { CardapioAbas } from '../CardapioAbas/CardapioAbas';
import { CardapioDiaConteudo } from '../CardapioDiaConteudo/CardapioDiaConteudo';

interface CardapioSemanaProps {
  dias: Cardapio[];
}

export function CardapioSemana({ dias }: CardapioSemanaProps) {
  const hoje = dayjs().format('YYYY-MM-DD');
  const indiceHoje = dias.findIndex((dia) => dataDoDia(dia) === hoje);
  const [indice, setIndice] = useState(Math.max(indiceHoje, 0));
  const diaSelecionado = dias[indice];

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        overflow: 'hidden',
        bgcolor: paletaDeCores.neutra[0],
        border: `1px solid ${COR_BORDA}`,
        borderRadius: '20px',
      }}
    >
      <CardapioAbas
        dias={dias}
        hoje={hoje}
        indiceSelecionado={indice}
        onSelecionar={setIndice}
      />
      {diaSelecionado && (
        <Box sx={{ py: 3, px: { xs: 2, sm: 4 } }}>
          <CardapioDiaConteudo dia={diaSelecionado} />
        </Box>
      )}
      <CardapioLegenda />
    </Paper>
  );
}
