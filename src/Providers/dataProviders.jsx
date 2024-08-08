import { createContext, useEffect, useState  } from "react";
import { api } from "../services/api";

export const UsuarioContext = createContext({});

export const UsuarioProvider = ({children}) => {
    const [usuarios, setUsuarios] = useState([]);
    const [cotas, setCotas] = useState([]);
    const [allCotas, setAllCotas] = useState([]);
    const [nCotas, setNCotas] = useState(null);
    const [valorCotas, setValorCotas] = useState(null);
    const [limiteCotas, setLimiteCotas] = useState(0);
    const [listCotas, setListCotas] = useState([]);
    
    useEffect(() => {

        const getData = async () => {
            try {
                const resposeUser = await api.get('usuarios');
                setUsuarios(resposeUser.data);
                const allCotas = resposeUser.data.flatMap(usuario => usuario.cotas);
                setAllCotas(allCotas);
                
                const resposeCotas = await api.get('cotas');
                setCotas(resposeCotas.data);
                setNCotas(resposeCotas.data[0].n_cotas);
                setValorCotas(resposeCotas.data[0].valor_cotas);

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
        getData();
        
    }, []);
    
    useEffect(() => {
        const allCotasFlattened = allCotas.filter(cota => cota !== '').flatMap(cota => cota.split(',').map(Number));
    setLimiteCotas(nCotas - allCotasFlattened.length);
    setListCotas(allCotasFlattened);
    },[allCotas,nCotas])

    

    return (
        <UsuarioContext.Provider value={{
            usuarios, cotas, nCotas, allCotas, limiteCotas, listCotas, valorCotas,
            setCotas, setNCotas, setUsuarios
        }}>
            {children}
        </UsuarioContext.Provider>        
    )
};


