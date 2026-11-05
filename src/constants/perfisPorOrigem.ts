import type { OrigemConta, Perfil } from 'types';

export const PERFIS_POR_ORIGEM: Record<OrigemConta, Perfil[]> = {
  UPF: [
    'AlunoGraduacaoUPF',
    'AlunoPosGraduacaoUPF',
    'AlunoCreatiUPF',
    'AlunoIntegradoUPF',
    'FuncionarioUPF',
  ],
  CONVIDADO: [
    'ProfessorOuComunidadeExterna',
    'ResidenteMultiprofissional',
    'EstudanteRedeMunicipalEstadual',
  ],
};
