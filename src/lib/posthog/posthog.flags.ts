/**
 * Feature flags do PostHog: `chave da flag` usada no projeto.
 *
 * ! Não renomeie flags existentes: a chave é a mesma criada no PostHog.
 */
export const FLAGS_POSTHOG = {
  /** Variantes: `centro` (controle) e `canto` */
  cesPosicao: 'ces-posicao',
} as const;
