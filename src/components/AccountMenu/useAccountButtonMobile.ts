import { useAccountMenu } from 'components/AccountMenu/useAccountMenu';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export function useAccountButtonMobile() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { nome, inicial, saindo, handleSair } = useAccountMenu();
  // guarda a rota em que abriu: trocar de página fecha o menu sem effect
  const [abertaEm, setAbertaEm] = useState<string | null>(null);

  function handleAlternar() {
    setAbertaEm((atual) => (atual === pathname ? null : pathname));
  }

  function handleConfiguracoes() {
    setAbertaEm(null);
    navigate('/configuracoes');
  }

  return {
    nome,
    inicial,
    saindo,
    aberta: abertaEm === pathname,
    handleAlternar,
    handleSair,
    handleConfiguracoes,
  };
}
