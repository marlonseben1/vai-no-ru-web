import { ReservasStore } from 'store/reservas/reservas.store';

export function useNavBar() {
  function handleReservar() {
    ReservasStore.setCadastroReservaDialog({ mode: 'criar' });
  }

  return { handleReservar };
}
