"use client";
import { createContext, useContext, useState } from "react";

export interface StateContextType {
  state: number;
  setState: (state: number) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<number>(0);
  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

export const changeState = () => {
  const context = useContext(StateContext);
  return context;
};
