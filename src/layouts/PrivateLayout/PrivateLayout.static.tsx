import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import MenuBookOutlined from '@mui/icons-material/MenuBookOutlined';
import type { ReactNode } from 'react';

export const ITENS_MENU: {
  texto: string;
  caminho: string;
  icone: ReactNode;
}[] = [
  { texto: 'Cardápio', caminho: '/cardapio', icone: <MenuBookOutlined /> },
  {
    texto: 'Minhas reservas',
    caminho: '/reservas',
    icone: <CalendarMonthOutlined />,
  },
];

export const ALTURA_APPBAR_MOBILE = 56;
export const ALTURA_BOTTOM_MENU = 64;
