import { type StoreApi, create, useStore } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface UserState {
  isAuth: boolean;
  name: string;
  email: string;
  token: string;
  setUsers: (name: string, email: string, token: string) => void;
}

export const createUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        isAuth: false,
        name: "",
        email: "",
        token: "",
        setUsers: (name, email, token) => set({ name, email, token }),
      }),
      {
        name: "users_bakan",
      },
    ),
  ),
);

const createBoundedUseStore = ((store) => (selector) =>
  useStore(store, selector)) as <S extends StoreApi<unknown>>(
  store: S,
) => {
  (): ExtractState<S>;
  <T>(selector: (state: ExtractState<S>) => T): T;
};

type ExtractState<S> = S extends { getState: () => infer X } ? X : never;

export const useUserStore = createBoundedUseStore(createUserStore);
