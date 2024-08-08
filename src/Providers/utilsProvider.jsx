import { createContext, useContext, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { api, pix } from "../services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../services/zod";
import { UsuarioContext } from "./dataProviders";

export const UtilsContext = createContext({});

export const UtilsProvider = ({ children }) => {
    const { listCotas, nCotas, valorCotas } = useContext(UsuarioContext);
    const [nCotasGeradas, setNCotasGeradas] = useState(0);
   
    const [valorTotalCotas, setValorTotalCotas] = useState(0);
    const [inputBloqueado, setInputBloqueado] = useState(false);
    

    const [pixData, setPixData] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [status, setStatus] = useState(null);
    const [transactionId, setTransactionId] = useState(null);

    const { reset, register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenConfirm, setModalOpenConfirm] = useState(false);
    const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false); 


    useEffect(() => {
        const storedModalState = localStorage.getItem('modalOpenConfirm');
        const storedPixData = localStorage.getItem('pixData');
        const storedTransactionId = localStorage.getItem('transactionId');
        if (storedModalState === 'true') {
            setModalOpenConfirm(true);
        }
        if (storedPixData) {
            setPixData(JSON.parse(storedPixData));
        }
        if (storedTransactionId) {
            setTransactionId(storedTransactionId);
        }
    }, []);

    

    
    const clearPixData = () => {
        setPixData(null);
        localStorage.removeItem('pixData');
        localStorage.removeItem('transactionId');
    };
    
    const setAndStorePixData = (data) => {
        setPixData(data);
        localStorage.setItem('pixData', JSON.stringify(data));
    };
    
    const setAndStoreTransactionId = (id) => {
        setTransactionId(id);
        localStorage.setItem('transactionId', id);
    };
    
    const modalRef = useRef(null);
    const intervalRef = useRef(null);
    
    const handleOpenConfirmModal = () => {
        setModalOpenConfirm(true);
        setIsConfirmModalOpened(true);
        localStorage.setItem('modalOpenConfirm', 'true');
        setStatus(null);
    };

    const handleCloseConfirmModal = () => {
        setModalOpenConfirm(false);
        setModalOpen(false);
        clearPixData();
        setTimeLeft(0);
        setStatus(null);
        setIsConfirmModalOpened(false);
        localStorage.removeItem('modalOpenConfirm');
        localStorage.removeItem('status');
        reset();
        window.location.reload();
        if (intervalRef.current) {
            clearInterval(intervalRef.current); // Limpa o intervalo
        }
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => {
        setModalOpen(false);
        reset();
        window.location.reload();
    }





    const gerarNumerosAleatorios = () => {
        const gerarNumeroAleatorio = (max) => Math.floor(Math.random() * max) + 1;
        const numeros = new Set();

        if (nCotasGeradas > nCotas) {
            console.warn("A quantidade desejada de números a serem gerados é maior que a quantidade total disponível na rifa.");
            return [];
        }

        let tentativas = 0;
        const maxTentativas = 1000;

        while (numeros.size < nCotasGeradas && tentativas < maxTentativas) {
            const numeroAleatorio = gerarNumeroAleatorio(nCotas);
            if (!listCotas.includes(numeroAleatorio) && !numeros.has(numeroAleatorio)) {
                numeros.add(numeroAleatorio);
            }
            tentativas++;
        }

        if (tentativas >= maxTentativas) {
            console.warn("Número máximo de tentativas atingido, pode haver um problema com os parâmetros fornecidos.");
        }

        return Array.from(numeros);
    };

    const onSubmit = async (formData) => {
        const cotasGeradas = gerarNumerosAleatorios();
        const pixData = new URLSearchParams();
        const valor = valorTotalCotas.toFixed(2);
        pixData.append('total', valor);
        pixData.append('name', formData.name);
        pixData.append('phone', formData.phone); 
    
        const dataToSend = {
            name: formData.name,
            phone: formData.phone,
            cotas: cotasGeradas.join(', '),
        };
    
        try {
            // Primeiro, envie os dados para a API Pix
            const responsePix = await pix.post('/gravar.php', pixData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
    
            const newTransactionId = responsePix.data.id;
            setAndStorePixData(responsePix.data);
            setAndStoreTransactionId(newTransactionId);
    
            // Agora verifique o status da transação
            let statusAprovado = false;
            while (!statusAprovado) {
                const statusResponse = await pix.get(`/status.php?id=${newTransactionId}`);
                if (statusResponse.data.status === 'aprovado') {
                    statusAprovado = true;
                    // Envie os dados para a API /usuarios
                    await api.post('/usuarios', dataToSend);
                    window.location.reload();
                    reset(); // Limpe o formulário após o sucesso
                } else if (statusResponse.data.error) {
                    console.error('Error from server:', statusResponse.data.error);
                    break; // Encerre o loop se houver erro
                }
    
                // Aguarde um tempo antes de verificar o status novamente
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        } catch (error) {
            console.error('Erro ao enviar dados para a API:', error.response ? error.response.data : error.message);
        }
    };
    

    useEffect(() => {
        setValorTotalCotas(valorCotas * nCotasGeradas);
    }, [valorCotas, nCotasGeradas]);

 // Function to fetch status
const fetchStatus = async () => {
    if (!transactionId) {
        console.warn('Transaction ID is not set');
        return;
    }

    try {
        const response = await pix.get(`/status.php?id=${transactionId}`);

        if (response.data.status) {
            const newStatus = response.data.status;
            if (newStatus !== status) {

                setStatus(newStatus);
                localStorage.setItem('status', newStatus);

                // Fechar o modal se o status for 'aprovado'
                if (newStatus === 'aprovado') {

                    handleCloseConfirmModal();
                }
            }
        } else if (response.data.error) {
            console.error('Error from server:', response.data.error);
        }
    } catch (error) {
        console.error('Erro ao buscar status:', error);
    }
};


    

    // Polling status every 2 seconds
    useEffect(() => {
        if (isConfirmModalOpened && transactionId) {

            intervalRef.current = setInterval(() => {
                fetchStatus();
            }, 2000);
        }
    
        return () => {
            if (intervalRef.current) {

                clearInterval(intervalRef.current); // Limpa o intervalo ao desmontar o componente ou ao fechar o modal
            }
        };
    }, [isConfirmModalOpened, transactionId]);

    // Retrieve status from localStorage on initial load
    useEffect(() => {
        const storedStatus = localStorage.getItem('status');
        if (storedStatus) {
            setStatus(storedStatus);
        }
    }, []);

    return (
        <UtilsContext.Provider value={{

            inputBloqueado,
            setInputBloqueado,
            register,
            errors,
            onSubmit,
            modalRef,
            nCotasGeradas,
            setNCotasGeradas,
            setModalOpen,
            modalOpen,
            handleOpenModal,
            handleCloseModal,
            handleSubmit,
            valorTotalCotas,
            pixData,
            handleOpenConfirmModal,
            modalOpenConfirm,
            clearPixData,
            handleCloseConfirmModal,
            timeLeft,
            setTimeLeft,
            status, isConfirmModalOpened
        }}>
            {children}
        </UtilsContext.Provider>
    );
};
