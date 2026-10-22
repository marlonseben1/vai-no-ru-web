import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type EscolhaCookies = 'pendente' | 'aceito' | 'recusado';

interface CookiesState {
  escolha: EscolhaCookies;
  aceitarCookies: () => void;
  recusarCookies: () => void;
  redefinirEscolhaCookies: () => void;
}

/** Guarda a escolha do usuário sobre cookies de análise e gravação de sessão. */
export const useCookiesStore = create<CookiesState>()(
  persist(
    (set) => ({
      escolha: 'pendente',
      aceitarCookies: () => set({ escolha: 'aceito' }),
      recusarCookies: () => set({ escolha: 'recusado' }),
      redefinirEscolhaCookies: () => set({ escolha: 'pendente' }),
    }),
    {
      name: 'vai-no-ru:cookies',
      partialize: ({ escolha }) => ({ escolha }),
    },
  ),
);
