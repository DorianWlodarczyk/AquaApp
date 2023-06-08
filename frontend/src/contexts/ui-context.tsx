import React, { useState } from "react";

interface props {
  children: React.ReactNode;
}

interface UIContextState {
  isOpen: boolean;
  setOpen: (open: boolean) => void;

  isExpanded: boolean;
  setExpanded: (open: boolean) => void;
}

export const UIContext = React.createContext({
  isOpen: false,
  setOpen: (open: boolean) => {},

  isExpanded: true,
  setExpanded: (open: boolean) => {},
});

export const MainContextProvider = ({ children }: props) => {
  const setOpen = (value: boolean) => {
    setState({ ...state, isOpen: value });
  };

  const setExpanded = (value: boolean) => {
    setState({ ...state, isExpanded: value });
  };

  const initState: UIContextState = {
    isOpen: false,
    setOpen: setOpen,

    isExpanded: true,
    setExpanded: setExpanded,
  };

  const [state, setState] = useState(initState);

  return <UIContext.Provider value={state}>{children}</UIContext.Provider>;
};
