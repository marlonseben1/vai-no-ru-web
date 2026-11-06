import { Box, ButtonBase } from '@mui/material';
import type { Cardapio } from 'types';
import { COR_BORDA, COR_DESTAQUE } from '../Cardapio.static';
import { CardapioDiaLabel } from '../CardapioDiaLabel/CardapioDiaLabel';

interface CardapioAbasProps {
  dias: Cardapio[];
  hoje: string;
  indiceSelecionado: number;
  onSelecionar: (indice: number) => void;
}

export function CardapioAbas({
  dias,
  hoje,
  indiceSelecionado,
  onSelecionar,
}: CardapioAbasProps) {
  return (
    <Box
      role="group"
      aria-label="Dias da semana"
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${dias.length}, 1fr)`,
        borderBottom: `1px solid ${COR_BORDA}`,
      }}
    >
      {dias.map((dia, indice) => {
        const selecionado = indice === indiceSelecionado;
        return (
          <ButtonBase
            key={dia.id}
            aria-pressed={selecionado}
            onClick={() => onSelecionar(indice)}
            sx={{
              minHeight: 44,
              pt: 1.25,
              pb: 0.75,
              borderBottom: `3px solid ${selecionado ? COR_DESTAQUE : 'transparent'}`,
              mb: '-1px',
            }}
          >
            <CardapioDiaLabel dia={dia} hoje={hoje} selecionado={selecionado} />
          </ButtonBase>
        );
      })}
    </Box>
  );
}
