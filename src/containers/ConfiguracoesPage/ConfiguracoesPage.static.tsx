import Cookie from '@mui/icons-material/Cookie';
import type { ReactNode } from 'react';

interface ItemConfiguracao {
  texto: string;
  caminho: string;
  icone: ReactNode;
}

export const ITENS_CONFIGURACOES: ItemConfiguracao[] = [
  {
    texto: 'Cookies e privacidade',
    caminho: '/configuracoes/privacidade',
    icone: <Cookie />,
  },
];
