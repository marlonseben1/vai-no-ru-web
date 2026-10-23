import type { SvgIconComponent } from '@mui/icons-material';
import SentimentDissatisfied from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutral from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfied from '@mui/icons-material/SentimentSatisfied';
import SentimentVeryDissatisfied from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentVerySatisfied from '@mui/icons-material/SentimentVerySatisfied';
import type { DialogProps, StackProps, SxProps, Theme } from '@mui/material';
import type { NotaCes } from 'types/ces';

export const ID_TITULO_CES = 'ces-dialog-titulo';

export const NOTA_SEM_COMENTARIO = 5 satisfies NotaCes;

export const TEXTO_ENVIAR = 'Enviar avaliação';
export const PLACEHOLDER_COMENTARIO = 'Conte em poucas palavras (opcional)';

export function getTituloAvaliacao(primeiroNome?: string) {
  return primeiroNome
    ? `Eaí ${primeiroNome}, como foi fazer sua reserva?`
    : 'Como foi fazer sua reserva?';
}

export const LEGENDA_POR_NOTA: Record<NotaCes, string> = {
  1: 'Muito difícil',
  2: 'Difícil',
  3: 'Médio',
  4: 'Fácil',
  5: 'Muito fácil',
};

export const ICONE_POR_NOTA: Record<NotaCes, SvgIconComponent> = {
  1: SentimentVeryDissatisfied,
  2: SentimentDissatisfied,
  3: SentimentNeutral,
  4: SentimentSatisfied,
  5: SentimentVerySatisfied,
};

export const COMENTARIO_MAX_CARACTERES = 1000;

export const TITULO_COMENTARIO_POR_NOTA: Record<
  Exclude<NotaCes, typeof NOTA_SEM_COMENTARIO>,
  string
> = {
  1: 'O que você achou difícil na reserva?',
  2: 'O que você achou difícil na reserva?',
  3: 'O que podemos fazer para facilitar ainda mais a reserva?',
  4: 'O que podemos fazer para facilitar ainda mais a reserva?',
};

export const COR_NOTA: Record<NotaCes, string> = {
  1: '#F8E0E0',
  2: '#FBECE0',
  3: '#FDF5D9',
  4: '#E8F4DE',
  5: '#C5E3AB',
};

export const COR_NOTA_SELECIONADA: Record<NotaCes, string> = {
  1: '#E53935',
  2: '#F57C00',
  3: '#F0A500',
  4: '#829E62',
  5: '#23A455',
};

export type PosicaoCes = 'centro' | 'canto';

export const POSICAO_CES_PADRAO: PosicaoCes = 'canto';

interface EstiloPosicaoCes {
  dialogProps: Partial<DialogProps>;
  dialogSx?: SxProps<Theme>;
  paperSx: SxProps<Theme>;
  colunaNotaSx: SxProps<Theme>;
  espacamentoNotas: StackProps['spacing'];
}

export const ESTILO_POR_POSICAO: Record<PosicaoCes, EstiloPosicaoCes> = {
  centro: {
    dialogProps: {},
    paperSx: { borderRadius: 4, maxWidth: 560 },
    colunaNotaSx: { flex: { xs: 1, sm: '0 0 88px' } },
    espacamentoNotas: { xs: 1, sm: 0 },
  },
  // no canto não há fundo escuro nem trava: a tela continua utilizável
  canto: {
    dialogProps: {
      hideBackdrop: true,
      disableScrollLock: true,
      disableEnforceFocus: true,
      disableAutoFocus: true,
      'aria-modal': false,
    },
    dialogSx: {
      pointerEvents: 'none',
      '& .MuiDialog-container': {
        pointerEvents: 'none',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      },
    },
    paperSx: {
      borderRadius: 4,
      maxWidth: 520,
      m: { xs: 2, sm: 4 },
      width: { xs: 'calc(100% - 32px)', sm: 'calc(100% - 64px)' },
      pointerEvents: 'auto',
      boxShadow: 8,
    },
    colunaNotaSx: { flex: 1 },
    espacamentoNotas: 1,
  },
};
