import { useAppStore } from 'store/app/appStore';

export function useDialogGeral() {
  const dialogGeral = useAppStore((state) => state.dialogGeral);
  const setDialogGeral = useAppStore((state) => state.setDialogGeral);

  function handleClose() {
    dialogGeral?.onClose?.();
    setDialogGeral(null);
  }

  function handleExited() {
    useAppStore.setState((state) =>
      state.dialogGeral?.open ? state : { dialogGeral: null },
    );
  }

  return { dialogGeral, handleClose, handleExited };
}
