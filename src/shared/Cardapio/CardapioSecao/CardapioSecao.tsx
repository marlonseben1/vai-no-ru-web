import { Box, Typography } from '@mui/material';
import type { LinhaItem } from '../Cardapio.helpers';
import { COR_BORDA, COR_TEXTO, COR_TEXTO_SECUNDARIO } from '../Cardapio.static';
import { CardapioSelo } from '../CardapioSelo/CardapioSelo';

interface CardapioSecaoProps {
  titulo: string;
  itens: LinhaItem[];
}

export function CardapioSecao({ titulo, itens }: CardapioSecaoProps) {
  if (itens.length === 0) return null;

  return (
    <Box sx={{ mb: 3, '&:last-child': { mb: 0 } }}>
      <Typography
        sx={{
          mb: 0.5,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: COR_TEXTO_SECUNDARIO,
        }}
      >
        {titulo}
      </Typography>
      {itens.map((item) => (
        <Box
          key={item.nome}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            columnGap: 1.5,
            rowGap: 1,
            py: 1.5,
            '&:not(:last-child)': { borderBottom: `1px solid ${COR_BORDA}` },
          }}
        >
          <Typography sx={{ fontSize: 17, color: COR_TEXTO }}>
            {item.nome}
          </Typography>
          {item.selos.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.75 }}>
              {item.selos.map((selo) => (
                <CardapioSelo key={selo} selo={selo} />
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
