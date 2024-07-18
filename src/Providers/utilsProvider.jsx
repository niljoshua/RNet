import { createContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../services/zod";

export const UtilsContext = createContext({});

export const UtilsProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  const [valorCotasRifa, setValorCotasRifa] = useState('');
  const [quantidadeCotasRifa, setQuantidadeCotasRifa] = useState('');
  const [nCotasGeradas, setNCotasGeradas] = useState(1);
  const [todosNumerosDeCotas, setTodosNumerosDeCotas] = useState([0]);
  const [limiteCotas, setLimiteCotas] = useState(0);
  
  const [currentId, setCurrentId] = useState(1);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get('/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados de usuários:', error);
      }
    };

    const fetchLastId = async () => {
      try {
        const { data } = await api.get('/usuarios');
        const usuarios = data.filter(user => user && user.id !== undefined);
        const lastId = usuarios.length > 0 ? Math.max(...usuarios.map(user => user.id)) : 0;
        return lastId;
      } catch (error) {
        console.error('Erro ao buscar o último ID:', error);
        return 0;
      }
    };

    const generateNextId = async () => {
      const lastId = await fetchLastId();
      setCurrentId(lastId + 1);
    };

    fetchUsuarios();
    generateNextId();
  }, []);

  useEffect(() => {
    const extrairTodosNumerosDeCotas = () => {
      const numerosDeCotas = usuarios.flatMap(user => user.cotas || []);
      const numerosUnicos = Array.from(new Set(numerosDeCotas));
      setTodosNumerosDeCotas(numerosUnicos);
    };

    extrairTodosNumerosDeCotas();
  }, [usuarios]);

  useEffect(() => {
    const fetchNCotasFromAPI = async () => {
      try {
        const { data } = await api.get('/db_cotas');
        setQuantidadeCotasRifa(parseInt(data[0].n_cotas));
      } catch (error) {
        console.error('Erro ao buscar n_cotas:', error);
      }
    };

    const limiter = quantidadeCotasRifa - todosNumerosDeCotas.length;
    setLimiteCotas(limiter >= 0 ? limiter : 0);

    fetchNCotasFromAPI();
  }, [quantidadeCotasRifa, todosNumerosDeCotas.length]);


  const [inputBloqueado, setInputBloqueado] = useState(false);

  useEffect(() => {
      // Reduzir a quantidadeCotasRifa pelos números em todosNumerosDeCotas
      const reduzirQuantidadeCotas = () => {
          
          if (limiteCotas <= 0) {
              setInputBloqueado(true);
          } else {
              setInputBloqueado(false);
          }
      };
      
      // Chame a função para reduzir a quantidadeCotasRifa sempre que todosNumerosDeCotas mudar
      reduzirQuantidadeCotas();

  }, [limiteCotas]); 

  const { reset, register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    setValorCotasRifa(e.target.value);
  };

  const handleInputChangeQ = (e) => {
    setQuantidadeCotasRifa(e.target.value);
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    const dadoCotas = { id: 1, n_cotas: quantidadeCotasRifa, valor_cotas: valorCotasRifa };

    localStorage.setItem('preco', valorCotasRifa);
    localStorage.setItem('numeroCotas', quantidadeCotasRifa);
    alert('Valor salvo!');

    try {
      const response = await api.post('/db_cotas', dadoCotas);
      console.log('Dados enviados com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const checkIfIdExists = async (id) => {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return response.data.exists;
    } catch (error) {
      console.error('Erro ao verificar o ID:', error);
      return false;
    }
  };

  const generateUniqueId = async () => {
    let id = currentId;
    const maxAttempts = 100;

    for (let i = 0; i < maxAttempts; i++) {
      if (!(await checkIfIdExists(id))) {
        return id;
      }
      id += 1;
    }

    console.error('Não foi possível gerar um ID único após várias tentativas.');
  };


  /// Gera numeros aleatorios
  const gerarNumerosAleatorios = () => {
    const gerarNumeroAleatorio = (max) => Math.floor(Math.random() * max) + 1;
    const numeros = new Set();

  
    if (nCotasGeradas > quantidadeCotasRifa) {
      console.warn("A quantidade desejada de números a serem gerados é maior que a quantidade total disponível na rifa.");
      return [];
    }
  
    let tentativas = 0;
    const maxTentativas = 1000; // Limite de tentativas para evitar loop infinito
  
    while (numeros.size < nCotasGeradas && tentativas < maxTentativas) {
      const numeroAleatorio = gerarNumeroAleatorio(quantidadeCotasRifa);
      if (!todosNumerosDeCotas.includes(numeroAleatorio) && !numeros.has(numeroAleatorio)) {
        numeros.add(numeroAleatorio);
      }
      tentativas++;
    }
  
    if (tentativas >= maxTentativas) {
      console.warn("Número máximo de tentativas atingido, pode haver um problema com os parâmetros fornecidos.");
    }
  

    return Array.from(numeros); // Retorna os números gerados
  };
  
  
  
  
  


  ///Envio 
  const onSubmit = async (formData) => {
    const uniqueId = await generateUniqueId();

    const numerosGerados = gerarNumerosAleatorios(); // Generate numbers before sending data

    try {
      const response = await api.post('/usuarios', {
        id: uniqueId,
        name: formData.name,
        phone: formData.phone,
        cotas: numerosGerados // Use the generated numbers
      });
      console.log('Dados enviados com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }

    reset();
    setCurrentId(uniqueId + 1);
    handleCloseModal();
    // window.location.reload()
  };

  return (
    <UtilsContext.Provider value={{
      limiteCotas,
      inputBloqueado, setInputBloqueado,
      register, errors,
      nCotasGeradas, setNCotasGeradas,
      onSubmit, modalRef,
      quantidadeCotasRifa, setQuantidadeCotasRifa,
      valorCotasRifa, setValorCotasRifa,
      setModalOpen, modalOpen,

      handleOpenModal, handleCloseModal,
      handleInputChange, handleInputChangeQ, handleSalvar, handleSubmit,
    }}>
      {children}
    </UtilsContext.Provider>
  );
};
