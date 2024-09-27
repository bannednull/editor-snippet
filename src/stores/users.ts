import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UsersStore {
  name: string;
  email: string;
  token: string;
  setUsers: (name: string, email: string, token: string) => void;
}

export const useUsersStore = create<UsersStore>()(
  persist(
    (set) => ({
      name: "",
      email: "",
      token: "",
      setUsers: (name, email, token) => set({ name, email, token }),
    }),
    {
      name: "users_bakan",
    },
  ),
);
