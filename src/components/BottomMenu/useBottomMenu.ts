import { useAccountMenu } from 'components/AccountMenu/useAccountMenu';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export const VALOR_CONTA = 'conta';

export function useBottomMenu() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { nome, inicial, saindo, handleSair } = useAccountMenu();
  const [contaAberta, setContaAberta] = useState(false);

  function handleMudar(valor: string) {
    if (valor === VALOR_CONTA) {
      setContaAberta((aberta) => !aberta);
      return;
    }
    setContaAberta(false);
    navigate(valor);
  }

  function handleFecharConta() {
    setContaAberta(false);
  }

  return {
    nome,
    inicial,
    saindo,
    contaAberta,
    valorSelecionado: contaAberta ? VALOR_CONTA : pathname,
    handleMudar,
    handleFecharConta,
    handleSair,
  };
}
