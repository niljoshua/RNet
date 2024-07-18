

import { createContext, useState  } from "react";
import { api } from "../services/api";

export const CotasContext = createContext({});

export const CotasProvider = ({children}) => {

    const [phone, setPhone] = useState('');
  const [shares, setShares] = useState([]);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");

  const handleInputChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await api.get('/usuarios');
      const user = response.data.find(user => user.phone === phone);
        
      setUserName(user.name);
      if (user) {
        setShares(user.cotas);
        setError(null);
      } else {
        setShares([]);
        setError('Nenhum usuário encontrado com este número de telefone.');
      }
    } catch (err) {
      setError('Erro ao buscar as cotas. Tente novamente mais tarde.');
      setShares([]);
    }
  };

    return (
        <CotasContext.Provider value={{
            userName,
            phone,
            shares,
            error,
            handleInputChange,
            handleSearch,
        }}>
            {children}
        </CotasContext.Provider>        
    )
};
