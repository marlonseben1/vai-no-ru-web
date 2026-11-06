import {
  HORARIO_LIMITE_MANHA,
  HORARIO_LIMITE_TARDE,
} from 'constants/prazosReserva';

export const COR_TEXTO = '#1F2A2A';
export const COR_TEXTO_SECUNDARIO = '#4A5453';
export const COR_BORDA = '#DDE3E2';
export const COR_PRINCIPAL = '#3F706B';
export const COR_PRINCIPAL_HOVER = '#345B57';

export const ID_TITULO_AVISO = 'aviso-pendente-titulo';

export const HORARIOS_ENVIO = [
  { rotulo: 'Almoço, ou Almoço e Jantar', horario: HORARIO_LIMITE_MANHA },
  { rotulo: 'Jantar', horario: HORARIO_LIMITE_TARDE },
];

export const caixaSx = {
  border: `1px solid ${COR_BORDA}`,
  borderRadius: 2,
  overflow: 'hidden',
} as const;

export const linhaSx = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  px: 2,
  py: 1.5,
  '&:not(:last-child)': { borderBottom: `1px solid ${COR_BORDA}` },
} as const;

export const rootPropsAviso = {
  'aria-labelledby': ID_TITULO_AVISO,
  slotProps: {
    backdrop: { sx: { bgcolor: 'rgba(15, 23, 23, 0.7)' } },
    paper: {
      sx: {
        fontFamily: 'Roboto, sans-serif',
        width: 600,
        maxWidth: 'calc(100% - 32px)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(15, 23, 23, 0.18)',
        '& .MuiDialogTitle-root': { px: 3.5, pt: 3.5, pb: 2.5 },
        '& .MuiDialogContent-root': { px: 3.5, pb: 2.5 },
        '& .MuiDialogActions-root': { px: 3.5, pb: 3, pt: 0 },
      },
    },
  },
} as const;
