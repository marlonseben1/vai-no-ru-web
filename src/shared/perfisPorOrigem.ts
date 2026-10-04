import type { Perfil } from 'types/perfil';
import type { OrigemConta } from 'types/usuario';

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
