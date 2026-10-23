import { SuspenseWithLoading } from 'components/SuspenseWithLoading/SuspenseWithLoading';
import { lazy, memo } from 'react';
import { useReservasStore } from 'store/reservas/reservas.store';

const CriarReservaDialogComp = lazy(() =>
  import(
    '../../containers/Reservas/CriarReservaDialog/CriarReservaDialog'
  ).then((modulo) => ({ default: modulo.CriarReservaDialog })),
);
const EditarReservaDialogComp = lazy(() =>
  import(
    '../../containers/Reservas/EditarReservaDialog/EditarReservaDialog'
  ).then((modulo) => ({ default: modulo.EditarReservaDialog })),
);

export const CadastroReservaDialog = memo(() => {
  const { open, mode } = useReservasStore(
    (state) => state.cadastroReservaDialog,
  );

  if (!open) return null;

  return (
    <SuspenseWithLoading>
      {mode === 'criar' ? (
        <CriarReservaDialogComp />
      ) : (
        <EditarReservaDialogComp />
      )}
    </SuspenseWithLoading>
  );
});
