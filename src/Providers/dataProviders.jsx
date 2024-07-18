import { createContext  } from "react";

export const UsuarioContext = createContext({});

export const UsuarioProvider = ({children}) => {


    return (
        <UsuarioContext.Provider value={{}}>
            {children}
        </UsuarioContext.Provider>        
    )
};


