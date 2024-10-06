import { type UserState, createUserStore } from "@/stores/users-store";
import React from "react";

export const UserContext = React.createContext<UserState | null>(null);

export default function SessionProvider({
  children,
}: { children: React.ReactNode }) {
  const storeRef = React.useRef<UserState>(createUserStore());

  if (!storeRef.current) {
    storeRef.current = createUserStore();
  }

  return (
    <UserContext.Provider value={storeRef.current}>
      {children}
    </UserContext.Provider>
  );
}
