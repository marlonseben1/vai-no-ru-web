import type { StoreApi } from 'zustand';

export type IStore<State, Actions = unknown> = Actions & DefaultActions<State>;

interface DefaultActions<State>
  extends Pick<StoreApi<State>, 'getState' | 'setState'> {
  resetState: () => void;
}
