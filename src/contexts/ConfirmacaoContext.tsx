import { ConfirmacaoDialog } from 'components/ConfirmacaoDialog/ConfirmacaoDialog';
import { createContext, type ReactNode, useRef, useState } from 'react';

export interface ConfirmacaoOptions {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
}

type AbrirConfirmacao = (options: ConfirmacaoOptions) => Promise<void>;

export const ConfirmacaoContext = createContext<AbrirConfirmacao>(() =>
  Promise.reject(new Error('ConfirmacaoProvider não está montado.')),
);

interface ConfirmacaoProviderProps {
  children: ReactNode;
}

export function ConfirmacaoProvider({ children }: ConfirmacaoProviderProps) {
  const [opcoes, setOpcoes] = useState<ConfirmacaoOptions | null>(null);
  const [open, setOpen] = useState(false);

  const promiseRef = useRef<{
    resolve: () => void;
    reject: () => void;
  } | null>(null);

  function abrirConfirmacao(options: ConfirmacaoOptions) {
    setOpcoes(options);
    setOpen(true);
    return new Promise<void>((resolve, reject) => {
      promiseRef.current = { resolve, reject };
    });
  }

  function handleConfirmar() {
    promiseRef.current?.resolve();
    setOpen(false);
  }

  function handleCancelar() {
    promiseRef.current?.reject();
    setOpen(false);
  }

  function handleExited() {
    // só limpa o conteúdo depois que a animação de saída já terminou
    setOpcoes(null);
  }

  return (
    <ConfirmacaoContext.Provider value={abrirConfirmacao}>
      {children}

      <ConfirmacaoDialog
        open={open}
        title={opcoes?.title ?? ''}
        description={opcoes?.description ?? ''}
        confirmLabel={opcoes?.confirmLabel ?? 'Confirmar'}
        cancelLabel={opcoes?.cancelLabel ?? 'Cancelar'}
        destructive={opcoes?.destructive}
        onConfirm={handleConfirmar}
        onCancel={handleCancelar}
        onExited={handleExited}
      />
    </ConfirmacaoContext.Provider>
  );
}
