import { type Cardapio, CategoriaItemCardapio } from 'types';
import { itensDaCategoria, paraLinha } from '../Cardapio.helpers';
import { CardapioSecao } from '../CardapioSecao/CardapioSecao';

interface CardapioMenuProps {
  cardapio: Cardapio;
}

export function CardapioMenu({ cardapio }: CardapioMenuProps) {
  return (
    <>
      <CardapioSecao
        titulo="Prato principal"
        itens={itensDaCategoria(cardapio, CategoriaItemCardapio.PratoPrincipal)}
      />
      <CardapioSecao
        titulo="Acompanhamentos"
        itens={itensDaCategoria(cardapio, CategoriaItemCardapio.Acompanhamento)}
      />
      <CardapioSecao
        titulo="Saladas"
        itens={itensDaCategoria(cardapio, CategoriaItemCardapio.Salada)}
      />
      <CardapioSecao
        titulo="Bebida"
        itens={(cardapio.suco ?? []).map(paraLinha)}
      />
    </>
  );
}
