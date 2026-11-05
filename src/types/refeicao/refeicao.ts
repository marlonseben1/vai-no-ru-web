export const REFEICAO_VALUES = ['Almoco', 'Jantar', 'AlmocoEJantar'] as const;

export type Refeicao = (typeof REFEICAO_VALUES)[number];
