import { zodResolver } from '@hookform/resolvers/zod';
import { useConcluirOnboardingMutation } from 'queries/auth/useConcluirOnboardingMutation';
import { useUsuarioAtualQuery } from 'queries/auth/useUsuarioAtualQuery';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { PERFIS_POR_ORIGEM } from 'shared/perfisPorOrigem';
import {
  type OnboardingFormValues,
  onboardingFormSchema,
} from './OnboardingPage.schema';

// e-mails institucionais de alunos têm a matrícula antes do @ (ex: 123456@upf.br)
function sugerirMatriculaPeloEmail(email: string): string {
  return email.match(/^(\d+)@upf\.br$/i)?.[1] ?? '';
}

export function useOnboardingPage() {
  const { data: usuario } = useUsuarioAtualQuery();
  const concluirOnboardingMutation = useConcluirOnboardingMutation();
  const navigate = useNavigate();

  const matriculaSugerida = sugerirMatriculaPeloEmail(usuario?.email ?? '');
  const perfisDisponiveis = usuario ? PERFIS_POR_ORIGEM[usuario.origem] : [];

  const { control, handleSubmit } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      nome: usuario?.nome ?? '',
      perfil: usuario?.perfil ?? undefined,
      matricula: usuario?.matricula ?? matriculaSugerida,
    },
  });

  const perfil = useWatch({ control, name: 'perfil' });
  const exigeMatricula = perfil === 'AlunoGraduacaoUPF';

  function onSubmit(valores: OnboardingFormValues) {
    concluirOnboardingMutation.mutate(
      {
        nome: valores.nome.trim(),
        perfil: valores.perfil,
        matricula:
          valores.perfil === 'AlunoGraduacaoUPF'
            ? valores.matricula.trim()
            : undefined,
      },
      { onSuccess: () => navigate('/cardapio') },
    );
  }

  return {
    control,
    email: usuario?.email ?? '',
    perfisDisponiveis,
    exigeMatricula,
    matriculaSugerida,
    concluirOnboardingMutation,
    handleSubmit: handleSubmit(onSubmit),
  };
}
