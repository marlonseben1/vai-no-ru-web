import { PERFIL_VALUES } from 'types/perfil';
import { REFEICAO_VALUES } from 'types/refeicao';
import { z } from 'zod';

export const reservaDiaFormSchema = z.object({
  data: z.string(),
  refeicao: z.enum(REFEICAO_VALUES),
});

export const criarReservaFormSchema = z
  .object({
    nome: z.string().min(3, 'O nome deve conter pelo menos 3 caracteres'),
    perfil: z.enum(PERFIL_VALUES),
    matricula: z
      .string()
      .regex(/^\d*$/, 'A matrícula deve conter apenas números'),
    dias: z
      .array(reservaDiaFormSchema)
      .min(1, 'Você deve informar pelo menos uma data'),
  })
  .superRefine((valores, ctx) => {
    if (
      valores.perfil === 'AlunoGraduacaoUPF' &&
      valores.matricula.trim() === ''
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'Informe o número da matrícula',
        path: ['matricula'],
      });
    }
  });

export type CriarReservaFormValues = z.infer<typeof criarReservaFormSchema>;
