# Sonner

Notificações toast do sistema, com a biblioteca [Sonner](https://sonner.emilkowal.ski/getting-started)
embrulhada em `Notificacao`, com API em português e variantes padronizadas.

## Estrutura

```
lib/sonner/
├── index.ts          # API pública
└── notificacao.ts    # Notificacao: exibir, info, aviso, erro, sucesso, fechar
```

O `<Toaster />` fica montado uma única vez em `App.tsx` (`position="top-center"`, `richColors`).
Não é preciso hook nem provider: `Notificacao` funciona dentro e fora de componentes React.

## Uso

```ts
import { Notificacao } from "lib/sonner";

// Atalhos: a variante já vem definida
Notificacao.sucesso({ titulo: "Reserva cancelada" });
Notificacao.erro({ titulo: "Falha ao reservar", mensagem: "Tente novamente." });
Notificacao.aviso({ titulo: "Atenção" });
Notificacao.info({ titulo: "Cardápio atualizado" });

// Forma genérica
Notificacao.exibir({
  variante: "sucesso",
  titulo: "Reserva confirmada",
  mensagem: "Almoço de segunda, 12h.",
  duracao: 6000,
  botaoFechar: true,
});
```

## Opções

| Opção         | Tipo                                      | Padrão  | Descrição                                          |
| ------------- | ----------------------------------------- | ------- | -------------------------------------------------- |
| `variante`    | `'info' \| 'aviso' \| 'erro' \| 'sucesso'` | —       | Obrigatória em `exibir`; os atalhos já a definem   |
| `titulo`      | `string`                                  | —       | Obrigatório                                        |
| `mensagem`    | `string`                                  | —       | Texto secundário, abaixo do título                 |
| `duracao`     | `number` (ms)                             | `4000`  | `Infinity` mantém o toast até ser fechado          |
| `botaoFechar` | `boolean`                                 | `false` | Exibe o botão "X"                                  |

`aviso` corresponde ao `warning` do Sonner; a conversão é feita pelo wrapper.

## Fechando um toast

`exibir` e os atalhos retornam o id do toast. `fechar` sem argumento fecha todos.

```ts
const id = Notificacao.info({
  titulo: "Processando...",
  duracao: Infinity,
  botaoFechar: true,
});
Notificacao.fechar(id);
```

Com `duracao: Infinity`, use `botaoFechar: true` ou feche por código, senão o usuário não consegue dispensar o toast.

## Onde é usado

Os toasts de sucesso e erro das ações de reserva ficam nas mutations (`queries/reserva`), e o erro de logout em
`useLogoutMutation`. Assim valem para qualquer tela que use a mutation, e o toast só aparece depois do resultado da API.

- O `catch {}` de `useReservaAcoes` só captura o cancelamento do diálogo de confirmação; erros de API **não** passam por ele.
- Os erros de reserva também disparam o evento `reserva_erro` no PostHog (ver `lib/posthog/README.md`).
- O texto de erro vem de `error.message` do `ApiError`.
