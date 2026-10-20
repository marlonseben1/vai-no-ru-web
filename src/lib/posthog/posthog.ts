import { env } from 'config/env';
import posthog, { type Properties } from 'posthog-js';
import type { Usuario } from 'types/usuario';
import { POSTHOG_CONFIG } from './posthog.config';
import type { ArgsPropriedades, NomeEvento } from './posthog.eventos';

/**
 * PostHog — eventos de comportamento do usuário no frontend.
 *
 * - Ativo apenas quando `VITE_POSTHOG_KEY` está definida; sem ela todos os métodos são ignorados.
 * - A gravação de sessão começa ao identificar o usuário, com inputs mascarados e sem corpo/headers
 *   de requisições. Textos com dados pessoais devem levar o atributo `data-ph-mask`.
 * - Usa o mesmo singleton de `posthog-js` entregue ao `PostHogProvider`.
 *
 * @example
 * PostHogAnalytics.capturar('reserva_cancelada');
 * PostHogAnalytics.capturar('cardapio_semana_navegada', { direcao: 'hoje' });
 */
export const PostHogAnalytics = {
  /** Inicializa o PostHog junto com o sistema (antes do login). */
  iniciar() {
    if (!env.posthogKey || posthog.__loaded) return;

    posthog.init(env.posthogKey, POSTHOG_CONFIG);
  },

  /**
   * Identifica o usuário logado. A identidade é o `id` (estável); `email` (matrícula@upf.br) e
   * `name` são person properties que o PostHog usa para exibir a pessoa nas gravações:
   * mostra o `email` e, sem ele, o `name`. Chame sempre que o usuário atual mudar.
   */
  identificar(usuario: Usuario) {
    if (!posthog.__loaded) return;

    posthog.identify(usuario.id, {
      perfil: usuario.perfil,
      origem: usuario.origem,
      name: usuario.nome,
      ...(usuario.matricula && { email: `${usuario.matricula}@upf.br` }),
    });
    // respeita sampling e gatilhos configurados no PostHog
    posthog.startSessionRecording();
  },

  capturar<E extends NomeEvento>(
    evento: E,
    ...[propriedades]: ArgsPropriedades<E>
  ) {
    if (!posthog.__loaded) return;

    posthog.capture(evento, propriedades as Properties | undefined);
  },

  /** Inicia a gravação ignorando sampling/gatilhos configurados no PostHog */
  forcarGravacao() {
    if (!posthog.__loaded) return;

    posthog.startSessionRecording({ event_trigger: true, sampling: true });
  },

  /** Desfaz a identificação do usuário (usar no logout) */
  limpar() {
    if (!posthog.__loaded) return;

    posthog.reset();
  },
};
