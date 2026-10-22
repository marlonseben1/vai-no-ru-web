import { PublicLayout } from 'layouts/PublicLayout/PublicLayout';
import type { RouteObject } from 'react-router';
import { requireOnboardingPendenteLoader } from 'routes/guards/requireOnboardingPendenteLoader';
import { CardapioPage } from '../containers/CardapioPage/CardapioPage';
import { ConfiguracoesPage } from '../containers/ConfiguracoesPage/ConfiguracoesPage';
import { ConfiguracoesPrivacidadePage } from '../containers/ConfiguracoesPrivacidadePage/ConfiguracoesPrivacidadePage';
import { Erro404Page } from '../containers/Erro404Page/Erro404Page';
import { LoginPage } from '../containers/LoginPage/LoginPage';
import { OnboardingPage } from '../containers/OnboardingPage/OnboardingPage';
import { PoliticaDePrivacidadePage } from '../containers/PoliticaDePrivacidadePage/PoliticaDePrivacidadePage';
import { ReservasPage } from '../containers/ReservasPage/ReservasPage';
import { TermosDeUsoPage } from '../containers/TermosDeUsoPage/TermosDeUsoPage';

const publicRoutes = [
  {
    Component: PublicLayout,
    children: [
      { path: 'termos', Component: TermosDeUsoPage },
      { path: 'privacidade', Component: PoliticaDePrivacidadePage },
      { path: '*', Component: Erro404Page },
    ],
  },
] as const satisfies RouteObject[];

const privateRoutes = [
  {
    lazy: () => import('layouts/PrivateLayout/PrivateLayout'),
    children: [
      { path: 'cardapio', Component: CardapioPage },
      { path: 'reservas', Component: ReservasPage },
      { path: 'configuracoes', Component: ConfiguracoesPage },
      {
        path: 'configuracoes/privacidade',
        Component: ConfiguracoesPrivacidadePage,
      },
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
