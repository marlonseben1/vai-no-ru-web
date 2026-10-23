import { PERFIL_VALUES } from 'types/perfil';
import { z } from 'zod';

export const onboardingFormSchema = z.object({
  nome: z.string().min(3, 'O nome deve conter pelo menos 3 caracteres'),
  perfil: z.enum(PERFIL_VALUES, { error: 'Selecione o seu perfil' }),
});

export type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;
