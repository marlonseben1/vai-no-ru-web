import { useLocation, useNavigate } from 'react-router';
import { ReservasStore } from 'store/reservas/reservas.store';

export const VALOR_NOVA_RESERVA = 'nova-reserva';

export function useBottomMenu() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleMudar(valor: string) {
    if (valor === VALOR_NOVA_RESERVA) {
      ReservasStore.setCadastroReservaDialog({ mode: 'criar' });
      return;
    }
    navigate(valor);
  }

  return { pathname, handleMudar };
}
