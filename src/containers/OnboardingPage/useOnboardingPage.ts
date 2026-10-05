import { zodResolver } from '@hookform/resolvers/zod';
import { useConcluirOnboardingMutation } from 'queries/auth/useConcluirOnboardingMutation';
import { useUsuarioAtualQuery } from 'queries/auth/useUsuarioAtualQuery';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { PERFIS_POR_ORIGEM } from 'shared/perfisPorOrigem';
import type { Perfil } from 'types/perfil';
import {
  type OnboardingFormValues,
  onboardingFormSchema,
} from './OnboardingPage.schema';

// e-mail de aluno é a matrícula: 123456@upf.br. O servidor deduz a matrícula dele,
// então só quem tem esse formato pode ser aluno de graduação
function extrairMatriculaDoEmail(email: string) {
  return email.match(/^(\d+)@upf\.br$/i)?.[1];
}

export function useOnboardingPage() {
  const { data: usuario } = useUsuarioAtualQuery();
  const concluirOnboardingMutation = useConcluirOnboardingMutation();
  const navigate = useNavigate();

  const matricula = extrairMatriculaDoEmail(usuario?.email ?? '');
  const alunoGraduacaoPermitido = !!matricula;
  const perfilSugerido: Perfil | undefined = alunoGraduacaoPermitido
    ? 'AlunoGraduacaoUPF'
    : undefined;
  const perfisDisponiveis = (
    usuario ? PERFIS_POR_ORIGEM[usuario.origem] : []
  ).filter(
    (perfil) => perfil !== 'AlunoGraduacaoUPF' || alunoGraduacaoPermitido,
  );
  const perfilSalvo =
    usuario?.perfil && perfisDisponiveis.includes(usuario.perfil)
      ? usuario.perfil
      : undefined;

  const { control, handleSubmit } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      nome: usuario?.nome ?? '',
      perfil: perfilSalvo ?? perfilSugerido,
    },
  });

  // só exibe o valor que o servidor vai usar; ele não é enviado
  const perfil = useWatch({ control, name: 'perfil' });
  const matriculaExibida =
    perfil === 'AlunoGraduacaoUPF' ? (matricula ?? '') : undefined;

  function onSubmit(valores: OnboardingFormValues) {
    concluirOnboardingMutation.mutate(
      { nome: valores.nome.trim(), perfil: valores.perfil },
      { onSuccess: () => navigate('/cardapio') },
    );
  }

  return {
    control,
    email: usuario?.email ?? '',
    perfisDisponiveis,
    perfilSugerido,
    matriculaExibida,
    concluirOnboardingMutation,
    handleSubmit: handleSubmit(onSubmit),
  };
}
