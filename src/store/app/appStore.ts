import type { DialogProps } from '@mui/material';
import type { ReactNode } from 'react';
import { create } from 'zustand';

export interface DialogGeral {
  open?: boolean;
  title?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  rootProps?: Partial<DialogProps>;
  onClose?: () => void;
}

interface AppState {
  loading: boolean;
  dialogGeral: DialogGeral | null;
  setLoading: (loading: boolean) => void;
  setDialogGeral: (payload: Omit<DialogGeral, 'open'> | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  loading: false,
  dialogGeral: null,
  setLoading: (loading) => set({ loading }),
  setDialogGeral: (payload) =>
    set((state) => ({
      dialogGeral: payload
        ? { ...payload, open: true }
        : state.dialogGeral && { ...state.dialogGeral, open: false },
    })),
}));
