import { createContext, useState } from 'react';
import { api } from '../services/api';

export const CotasContext = createContext({});

export const CotasProvider = ({ children }) => {
  const [phone, setPhone] = useState('');
  const [shares, setShares] = useState([]);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModalCotas = () => setIsModalOpen(true);
  const handleCloseModalCotas = () => {
    setPhone(''); // Limpa o número de telefone
    setShares([]); // Limpa as cotas
    setError(null); // Limpa a mensagem de erro
    setIsModalOpen(false); // Fecha o modal
    window.location.reload();
  };
  

  const handleInputChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSearch = async () => {
    if (!phone) {
      setError('Por favor, insira um número de telefone.');
      setShares([]);
      return;
    }
  
    try {
      const response = await api.get('/usuarios');

  
      const user = response.data.find(user => user.phone === phone);
  
      if (user) {
        setUserName(user.name);
        // Transformar a string de cotas em um array
        const cotasArray = user.cotas ? user.cotas.split(',').map(cota => cota.trim()) : [];
        setShares(cotasArray);
        setError(null);
      } else {
        setShares([]);
        setError('Nenhum usuário encontrado com este número de telefone.');
      }
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setError('Erro ao buscar dados. Tente novamente mais tarde.');
      setShares([]);
    }
  };
  

  return (
    <CotasContext.Provider value={{
      userName,
      phone,
      shares,
      error,
      isModalOpen,
      handleInputChange,
      handleSearch,
      handleOpenModalCotas, 
      handleCloseModalCotas,
    }}>
      {children}
    </CotasContext.Provider>
  );
};
