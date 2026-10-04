export const PERFIL_VALUES = [
  'AlunoGraduacaoUPF',
  'AlunoPosGraduacaoUPF',
  'AlunoCreatiUPF',
  'AlunoIntegradoUPF',
  'ProfessorOuComunidadeExterna',
  'FuncionarioUPF',
  'ResidenteMultiprofissional',
  'EstudanteRedeMunicipalEstadual',
] as const;

export type Perfil = (typeof PERFIL_VALUES)[number];
