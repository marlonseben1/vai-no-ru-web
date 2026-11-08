import useIsDesktop from 'hooks/useIsDesktop';
import { useLoginMutation } from 'queries/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCardapioDoDia } from './useCardapioDoDia';

export function useLogin() {
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [aceitarPolitica, setAceitarPolitica] = useState(false);

  // abaixo de desktop o cardápio não aparece, então nem buscamos
  const isDesktop = useIsDesktop();
  const cardapioDoDia = useCardapioDoDia(isDesktop);

  const precisaAceitarPolitica =
    loginMutation.isError && loginMutation.error.code === 'CONSENT_REQUIRED';

  function enviarLogin(token: string, aceitar?: boolean) {
    loginMutation.mutate(
      { token, aceitarPolitica: aceitar },
      { onSuccess: () => navigate('/cardapio') },
    );
  }

  function handleGoogleSuccess(credentialResponse: { credential?: string }) {
    if (!credentialResponse.credential) return;
    setGoogleToken(credentialResponse.credential);
    enviarLogin(credentialResponse.credential);
  }

  function handleAceitarEContinuar() {
    if (!googleToken) return;
    enviarLogin(googleToken, true);
  }

  const enviando = loginMutation.isPending;
  const erro =
    loginMutation.isError && !precisaAceitarPolitica
      ? loginMutation.error.message
      : undefined;
  const mostrarCardapio =
    cardapioDoDia.status === 'carregando' ||
    cardapioDoDia.status === 'disponivel';
  const cardapio =
    cardapioDoDia.status === 'disponivel' ? cardapioDoDia.cardapio : undefined;

  return {
    erro,
    cardapio,
    enviando,
    aceitarPolitica,
    mostrarCardapio,
    setAceitarPolitica,
    handleGoogleSuccess,
    precisaAceitarPolitica,
    handleAceitarEContinuar,
  };
}
