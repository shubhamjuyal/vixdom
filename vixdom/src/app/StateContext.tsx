"use client";
import { createContext, useContext, useState } from "react";

export interface StateContextType {
  currentState: number;
  changeCurrentState: (state: number) => void;
  file: any;
  setFile: (state: File | null) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentState, changeCurrentState] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  return (
    <StateContext.Provider
      value={{ currentState, changeCurrentState, file, setFile }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const changeState = () => {
  const context = useContext(StateContext);
  return context;
};

export const getFileState = () => {
  const context = useContext(StateContext);
  return [context?.file, context?.setFile];
};
