import { env } from 'config/env';
import type { PostHogConfig } from 'posthog-js';

/** Atributo que mascara o texto do elemento na gravação (nome, e-mail, matrícula...) */
export const ATRIBUTO_MASCARA_PH = 'data-ph-mask';

export const POSTHOG_CONFIG: Partial<PostHogConfig> = {
  api_host: env.posthogHost,
  disable_session_recording: true,
  autocapture: false,
  capture_pageview: false,
  capture_pageleave: false,
  session_recording: {
    maskAllInputs: true,
    maskTextSelector: `[${ATRIBUTO_MASCARA_PH}]`,
    recordBody: false,
    recordHeaders: false,
  },
};
