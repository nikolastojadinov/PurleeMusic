import React, { createContext, useContext, useState, ReactNode } from "react";
import type { PiUser } from "./PiLogin";

interface PiAuthContextType {
  user: PiUser | null;
  setUser: (user: PiUser | null) => void;
}

const PiAuthContext = createContext<PiAuthContextType | undefined>(undefined);

export const PiAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<PiUser | null>(null);
  return (
    <PiAuthContext.Provider value={{ user, setUser }}>
      {children}
    </PiAuthContext.Provider>
  );
};

export function usePiAuth() {
  const ctx = useContext(PiAuthContext);
  if (!ctx) throw new Error("usePiAuth must be used within PiAuthProvider");
  return ctx;
}
