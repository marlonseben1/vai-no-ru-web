import { PublicLayout } from 'layouts/PublicLayout/PublicLayout';
import type { RouteObject } from 'react-router';
import { requireOnboardingPendenteLoader } from 'routes/guards/requireOnboardingPendenteLoader';
import { Cardapio } from '../containers/Cardapio/Cardapio';
import { Configuracoes } from '../containers/Configuracoes/Configuracoes';
import { ConfiguracoesPrivacidade } from '../containers/ConfiguracoesPrivacidade/ConfiguracoesPrivacidade';
import { Erro404 } from '../containers/Erro404/Erro404';
import { Login } from '../containers/Login/Login';
import { Onboarding } from '../containers/Onboarding/Onboarding';
import { PoliticaDePrivacidade } from '../containers/PoliticaDePrivacidade/PoliticaDePrivacidade';
import { Reservas } from '../containers/Reservas/Reservas';
import { TermosDeUso } from '../containers/TermosDeUso/TermosDeUso';

const publicRoutes = [
  {
    Component: PublicLayout,
    children: [
      { path: 'termos', Component: TermosDeUso },
      { path: 'privacidade', Component: PoliticaDePrivacidade },
      { path: '*', Component: Erro404 },
    ],
  },
] as const satisfies RouteObject[];

const privateRoutes = [
  {
    lazy: () => import('layouts/PrivateLayout/PrivateLayout'),
    children: [
      { path: 'cardapio', Component: Cardapio },
      { path: 'reservas', Component: Reservas },
      { path: 'configuracoes', Component: Configuracoes },
      {
        path: 'configuracoes/privacidade',
        Component: ConfiguracoesPrivacidade,
      },
    ],
  },
] as const satisfies RouteObject[];

const onboardingRoute = {
  path: 'onboarding',
  loader: requireOnboardingPendenteLoader,
  Component: Onboarding,
} as const satisfies RouteObject;

export const routeDefinitions = [
  { index: true, Component: Login },
  onboardingRoute,
  ...publicRoutes,
  ...privateRoutes,
] as const satisfies RouteObject[];
