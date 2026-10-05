import { useLogoutMutation } from 'queries/auth/useLogoutMutation';
import { useUsuarioAtualQuery } from 'queries/auth/useUsuarioAtualQuery';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function useAccountMenu() {
  const { data: usuario } = useUsuarioAtualQuery();
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  function handleAbrir(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleFechar() {
    setAnchorEl(null);
  }

  function handleSair() {
    logoutMutation.mutate(undefined, { onSuccess: () => navigate('/') });
  }

  return {
    nome: usuario?.nome,
    inicial: usuario?.nome.charAt(0).toUpperCase(),
    anchorEl,
    aberto: Boolean(anchorEl),
    saindo: logoutMutation.isPending,
    handleAbrir,
    handleFechar,
    handleSair,
  };
}
