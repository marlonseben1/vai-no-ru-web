import { Box, Typography } from '@mui/material';
import { colorPalette } from 'theme/colorPalette';
import { type Cardapio, CategoriaItemCardapio } from 'types/cardapio';
import {
  itensDaCategoria,
  type LinhaItem,
  paraLinha,
} from '../CardapioPage.helpers';
import { CardapioSelo } from '../CardapioSelo/CardapioSelo';

interface CardapioMenuProps {
  cardapio: Cardapio;
}

function Secao({ titulo, itens }: { titulo: string; itens: LinhaItem[] }) {
  if (itens.length === 0) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="subtitle2"
        color={colorPalette.neutral[600]}
        sx={{ mb: 0.5 }}
      >
        {titulo}
      </Typography>
      {itens.map((item) => (
        <Box
          key={item.nome}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            py: 1.5,
            borderBottom: `1px solid ${colorPalette.neutral[100]}`,
          }}
        >
          <Typography variant="body1">{item.nome}</Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {item.selos.map((selo) => (
              <CardapioSelo key={selo} selo={selo} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export function CardapioMenu({ cardapio }: CardapioMenuProps) {
  return (
    <>
      <Secao
        titulo="Prato principal"
        itens={itensDaCategoria(cardapio, CategoriaItemCardapio.PratoPrincipal)}
      />
      <Secao
        titulo="Acompanhamentos"
        itens={itensDaCategoria(cardapio, CategoriaItemCardapio.Acompanhamento)}
      />
      <Secao
        titulo="Saladas"
        itens={itensDaCategoria(cardapio, CategoriaItemCardapio.Salada)}
      />
      <Secao titulo="Bebida" itens={(cardapio.suco ?? []).map(paraLinha)} />
    </>
  );
}
