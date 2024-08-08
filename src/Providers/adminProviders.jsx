import { createContext, useState } from 'react';

export const AdminContext = createContext({});

export const AdminProvider = ({ children }) => {

    const [valorCotasRifa, setValorCotasRifa] = useState(0);
    const [quantidadeCotasRifa, setQuantidadeCotasRifa] = useState(0);

    const handleInputValorCota = (event) => {
        setValorCotasRifa(Number(event.target.value));
    };

    const handleInputQuantidadeCota = (event) => {
        setQuantidadeCotasRifa(Number(event.target.value));
    };

  return (
    <AdminContext.Provider value={{
        valorCotasRifa,
        quantidadeCotasRifa,
        handleInputValorCota,
        handleInputQuantidadeCota,
    }}>
      {children}
    </AdminContext.Provider>
  );
};
