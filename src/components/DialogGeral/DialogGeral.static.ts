// No mobile a dialog fica ancorada na base, ocupando 92% da altura, com os cantos de cima arredondados
export const dialogMobileSx = {
  '& .MuiDialog-container': { alignItems: 'flex-end' },
  '& .MuiDialog-paper': {
    m: 0,
    width: '100%',
    maxWidth: '100%',
    height: '92%',
    maxHeight: '92%',
    borderRadius: '16px 16px 0 0',
    boxShadow: 'none',
  },
} as const;
