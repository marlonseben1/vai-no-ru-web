import { toast } from 'sonner';

export type VarianteNotificacao = 'info' | 'aviso' | 'erro' | 'sucesso';

export type OpcoesNotificacao = {
  variante: VarianteNotificacao;
  titulo: string;
  mensagem?: string;
  /** Em milissegundos. Use `Infinity` para só fechar manualmente. */
  duracao?: number;
  /** Exibe o botão "X" para fechar o toast. Padrão: `false`. */
  botaoFechar?: boolean;
};

type OpcoesAtalho = Omit<OpcoesNotificacao, 'variante'>;

const DURACAO_PADRAO_MS = 4000;

const TOAST_POR_VARIANTE = {
  info: toast.info,
  aviso: toast.warning,
  erro: toast.error,
  sucesso: toast.success,
} satisfies Record<VarianteNotificacao, typeof toast.info>;

function exibir({
  variante,
  titulo,
  mensagem,
  duracao = DURACAO_PADRAO_MS,
  botaoFechar = false,
}: OpcoesNotificacao) {
  return TOAST_POR_VARIANTE[variante](titulo, {
    description: mensagem,
    duration: duracao,
    closeButton: botaoFechar,
  });
}

export const Notificacao = {
  exibir,
  info: (opcoes: OpcoesAtalho) => exibir({ ...opcoes, variante: 'info' }),
  aviso: (opcoes: OpcoesAtalho) => exibir({ ...opcoes, variante: 'aviso' }),
  erro: (opcoes: OpcoesAtalho) => exibir({ ...opcoes, variante: 'erro' }),
  sucesso: (opcoes: OpcoesAtalho) => exibir({ ...opcoes, variante: 'sucesso' }),
  fechar: (id?: string | number) => toast.dismiss(id),
};
