import type { OrigemConta, Perfil, Refeicao, StatusReserva } from 'types';

export const LABEL_REFEICAO: Record<Refeicao, string> = {
  Almoco: 'Almoço',
  Jantar: 'Jantar',
  AlmocoEJantar: 'Almoço e Jantar',
};

export const LABEL_PERFIL: Record<Perfil, string> = {
  AlunoGraduacaoUPF: 'Aluno graduação UPF',
  AlunoPosGraduacaoUPF: 'Aluno pós-graduação UPF',
  AlunoCreatiUPF: 'Aluno Creati UPF',
  AlunoIntegradoUPF: 'Aluno Integrado UPF',
  ProfessorOuComunidadeExterna: 'Professor ou Comunidade externa',
  FuncionarioUPF: 'Funcionário UPF',
  ResidenteMultiprofissional: 'Residente multiprofissional',
  EstudanteRedeMunicipalEstadual: 'Estudante rede municipal/estadual',
};

export const LABEL_STATUS_RESERVA: Record<StatusReserva, string> = {
  PENDENTE: 'Pendente',
  AGENDADA: 'Confirmada',
  NAO_AGENDADA: 'Não agendada',
  INATIVA: 'Expirada',
  CANCELADA: 'Cancelada',
};

export const LABEL_ORIGEM_CONTA: Record<OrigemConta, string> = {
  UPF: 'Comunidade UPF',
  CONVIDADO: 'Convidado',
};
