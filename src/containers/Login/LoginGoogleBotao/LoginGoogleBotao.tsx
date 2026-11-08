import { Box } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useLayoutEffect, useRef, useState } from 'react';

// limites aceitos pelo botão do Google
const LARGURA_MINIMA = 200;
const LARGURA_MAXIMA = 400;

interface LoginGoogleBotaoProps {
  onSuccess: (credentialResponse: { credential?: string }) => void;
}

// o botão do Google só aceita largura em px, então medimos o contêiner
export function LoginGoogleBotao({ onSuccess }: LoginGoogleBotaoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [largura, setLargura] = useState<number>();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const medir = () =>
      setLargura(
        Math.min(
          LARGURA_MAXIMA,
          Math.max(LARGURA_MINIMA, Math.floor(container.clientWidth)),
        ),
      );
    medir();

    const observer = new ResizeObserver(medir);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        minHeight: 44,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {largura && (
        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => {}}
          text="continue_with"
          theme="outline"
          size="large"
          shape="rectangular"
          width={largura}
        />
      )}
    </Box>
  );
}
