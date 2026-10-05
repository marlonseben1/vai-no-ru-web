import { PublicLayout } from 'layouts/PublicLayout/PublicLayout';
import type { RouteObject } from 'react-router';
import { requireOnboardingPendenteLoader } from 'routes/guards/requireOnboardingPendenteLoader';
import { CardapioPage } from '../containers/CardapioPage/CardapioPage';
import { Erro404Page } from '../containers/Erro404Page/Erro404Page';
import { LoginPage } from '../containers/LoginPage/LoginPage';
import { OnboardingPage } from '../containers/OnboardingPage/OnboardingPage';
import { ReservasPage } from '../containers/ReservasPage/ReservasPage';

const publicRoutes = [
  {
    Component: PublicLayout,
    children: [{ path: '*', Component: Erro404Page }],
  },
] as const satisfies RouteObject[];

const privateRoutes = [
  {
    lazy: () => import('layouts/PrivateLayout/PrivateLayout'),
    children: [
      { path: 'cardapio', Component: CardapioPage },
      { path: 'reservas', Component: ReservasPage },
    ],
  },
] as const satisfies RouteObject[];

const onboardingRoute = {
  path: 'onboarding',
  loader: requireOnboardingPendenteLoader,
  Component: OnboardingPage,
} as const satisfies RouteObject;

export const routeDefinitions = [
  { index: true, Component: LoginPage },
  onboardingRoute,
  ...publicRoutes,
  ...privateRoutes,
] as const satisfies RouteObject[];
