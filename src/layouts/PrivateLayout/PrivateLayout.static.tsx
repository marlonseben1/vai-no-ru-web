import EventNoteIcon from '@mui/icons-material/EventNote';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import type { ReactNode } from 'react';

export const ITENS_MENU: {
  texto: string;
  caminho: string;
  icone: ReactNode;
}[] = [
  { texto: 'Cardápio', caminho: '/cardapio', icone: <MenuBookIcon /> },
  { texto: 'Minhas reservas', caminho: '/reservas', icone: <EventNoteIcon /> },
];
