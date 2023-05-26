import React, {useState} from 'react';

interface props {
  children: React.ReactNode
}

interface MainContextState {
  isOpen: boolean,
  setOpen: (open: boolean) => void,
}


export const MainContext = React.createContext({
  isOpen: false,
  setOpen: (open: boolean) => {},
});

export const MainContextProvider = ({children}: props) => {
  const setOpen = (value: boolean) => {
    setState({...state, isOpen: value})
  }

  const initState: MainContextState = {
    isOpen: false,
    setOpen: setOpen,
  }

  const [state, setState] = useState(initState)

  return (
    <MainContext.Provider value={state}>
      {children}
    </MainContext.Provider>
  )
}