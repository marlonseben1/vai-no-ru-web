# PostHog

Integração do sistema com o PostHog: inicialização, identificação, eventos e gravação de sessão.

## Estrutura

```
lib/posthog/
├── index.ts             # API pública
├── posthog.ts           # PostHogAnalytics: iniciar, identificar, capturar, forcarGravacao, limpar
├── posthog.eventos.ts   # catálogo de eventos (nome → propriedades), agrupado por domínio
└── posthog.config.ts    # opções do init + privacidade da gravação
```

## Uso

O evento é identificado pelo próprio nome, que é o mesmo que aparece no PostHog:

```ts
import { PostHogAnalytics } from "lib/posthog";

PostHogAnalytics.capturar("reserva_cancelada");
PostHogAnalytics.capturar("cardapio_semana_navegada", { direcao: "hoje" });
```

O TypeScript autocompleta o nome, recusa nomes inexistentes e exige (ou recusa) as propriedades
conforme o catálogo. Funciona dentro e fora de componentes React.

## Ativação

Ativo apenas quando `VITE_POSTHOG_KEY` está definida (em build time). Sem ela, tudo é ignorado.

- `iniciar` roda em `App.tsx`, no boot.
- `identificar` roda em `usePostHogSync`, quando o usuário atual é carregado e o usuário aceitou os cookies.
- `limpar` roda em `useLogoutMutation`.
- `$pageview` é enviado manualmente por `usePageview` (autocapture e pageview automático ficam desligados).

## Adicionando um evento

Adicione uma linha na seção do domínio em `EventosPostHog` (`posthog.eventos.ts`):

```ts
dominio_novo_evento: SemPropriedades;
dominio_com_props: {
  quantidade: number;
}
```

- O nome deve ser `snake_case` minúsculo.
- **Nunca renomeie um evento existente**, porque isso quebra o histórico no PostHog.

## Consentimento de cookies

O PostHog inicia em modo opt-out (`opt_out_capturing_by_default`): nada é capturado nem gravado até o
usuário aceitar o banner (`components/CookieBanner`). A escolha fica em `store/cookies` e é aplicada por
`usePostHogSync` via `definirConsentimento`. Recusar ou revogar ("Preferências de cookies") faz opt-out e `reset`.
`identificar`, `forcarGravacao` e a captura ficam inertes enquanto houver opt-out.

## Gravação de sessão e LGPD

A gravação começa em `identificar` (respeitando sampling e gatilhos do projeto no PostHog).
`forcarGravacao()` ignora essa configuração; é usada na primeira reserva.

- Inputs sempre mascarados (`maskAllInputs`).
- Corpo e headers das requisições **não** são gravados (a resposta de `/auth/me` e do login traz nome e e-mail).
- **Todo texto com dado pessoal deve levar o atributo `data-ph-mask`**
- **Identificação:** o `distinct_id` é o `id` do usuário. `email` (`<matrícula>@upf.br`, só para quem tem
  matrícula) e `name` vão como person properties, e é por elas que o PostHog mostra a pessoa nas
  gravações (exibe o `email` e, sem ele, o `name`). São dados pessoais: restrinja o acesso ao projeto.
- A política de privacidade precisa informar o uso de analytics, gravação de sessão e o envio de
  matrícula e nome ao PostHog.
