import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useUsuarioAtualQuery } from 'queries/auth/useUsuarioAtualQuery';
import { useCriarReservasMutation } from 'queries/reserva/useCriarReservasMutation';
import { useReservasQuery } from 'queries/reserva/useReservasQuery';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { PERFIS_POR_ORIGEM } from 'shared/perfisPorOrigem';
import {
  type CriarReservaFormValues,
  criarReservaFormSchema,
} from './CriarReservaDialog.schema';

interface UseCriarReservaDialogParams {
  onClose: () => void;
}

export function useCriarReservaDialog({
  onClose,
}: UseCriarReservaDialogParams) {
  const { data: usuario } = useUsuarioAtualQuery();
  const criarReservasMutation = useCriarReservasMutation();
  const reservasQuery = useReservasQuery({
    pageSize: 100,
    sort: 'dataReserva',
    order: 'desc',
  });

  const perfisDisponiveis = usuario ? PERFIS_POR_ORIGEM[usuario.origem] : [];

  const valoresPadrao: Partial<CriarReservaFormValues> = {
    nome: usuario?.nome ?? '',
    perfil: usuario?.perfil ?? undefined,
    matricula: usuario?.matricula ?? '',
    dias: [],
  };

  const { control, handleSubmit, reset } = useForm<CriarReservaFormValues>({
    resolver: zodResolver(criarReservaFormSchema),
    defaultValues: valoresPadrao,
  });

  const perfil = useWatch({ control, name: 'perfil' });
  const exigeMatricula = perfil === 'AlunoGraduacaoUPF';

  // datas que já têm reserva (qualquer status): o servidor ignora essas datas
  const diasBloqueados = useMemo(() => {
    const hoje = dayjs().format('YYYY-MM-DD');
    return (reservasQuery.data?.data ?? [])
      .map((reserva) => reserva.dataReserva.slice(0, 10))
      .filter((data) => data >= hoje);
  }, [reservasQuery.data]);

  function handleLimpar() {
    reset(valoresPadrao);
  }

  // só limpa depois da animação de saída, para o conteúdo não "piscar"
  function handleExited() {
    reset(valoresPadrao);
    criarReservasMutation.reset();
  }

  function onSubmit(valores: CriarReservaFormValues) {
    const matricula =
      valores.perfil === 'AlunoGraduacaoUPF'
        ? valores.matricula.trim() || undefined
        : undefined;

    criarReservasMutation.mutate(
      {
        nome: valores.nome,
        perfil: valores.perfil,
        matricula,
        dias: valores.dias,
      },
      { onSuccess: onClose },
    );
  }

  return {
    control,
    email: usuario?.email ?? '',
    perfisDisponiveis,
    exigeMatricula,
    diasBloqueados,
    criarReservasMutation,
    handleLimpar,
    handleExited,
    handleSubmit: handleSubmit(onSubmit),
  };
}
