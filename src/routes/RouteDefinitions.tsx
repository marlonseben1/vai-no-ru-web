import { PrivateLayout } from 'layouts/PrivateLayout/PrivateLayout';
import { PublicLayout } from 'layouts/PublicLayout/PublicLayout';
import type { RouteObject } from 'react-router';
import { CardapioPage } from '../containers/CardapioPage/CardapioPage';
import { Erro404Page } from '../containers/Erro404Page/Erro404Page';
import { LoginPage } from '../containers/LoginPage/LoginPage';
import { ReservasPage } from '../containers/ReservasPage/ReservasPage';

const publicRoutes = [
  {
    Component: PublicLayout,
    children: [
      { index: true, Component: LoginPage },
      { path: 'cardapio', Component: CardapioPage },
      { path: '*', Component: Erro404Page },
    ],
  },
] as const satisfies RouteObject[];

const privateRoutes = [
  {
    Component: PrivateLayout,
    children: [{ path: 'reservas', Component: ReservasPage }],
  },
] as const satisfies RouteObject[];

export const routeDefinitions = [
  ...publicRoutes,
  ...privateRoutes,
] as const satisfies RouteObject[];
