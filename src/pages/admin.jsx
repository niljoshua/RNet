import { useContext } from 'react';
import '../styles/Admin/styles.css';
import { api } from '../services/api';
import { AdminContext } from '../Providers/adminProviders';

export const Admin = () => {
       const { valorCotasRifa, quantidadeCotasRifa, handleInputValorCota, handleInputQuantidadeCota } = useContext(AdminContext);


    const handleSubmit = async () => {
    
        try {
            const response = await api.post('/cotas', {
                id: 1,  // Ajuste conforme necessário
                valorCotasRifa,
                quantidadeCotasRifa,
            });
    
            if (response.status === 200) {
                console.log('Dados atualizados com sucesso!');
                window.location.reload();
            } else {
                console.error('Erro ao atualizar os dados.');
            }
        } catch (error) {
            console.error('Erro ao atualizar os dados:', error);
        }
    };

    return (
        <div className='AdminController'>
            <div className='AdminDiv1'>
                <span>Escolha o valor da cota</span>
                <input
                    type="number"
                    value={valorCotasRifa}
                    onChange={handleInputValorCota}
                />

                <span>Escolha a quantidade de cota</span>
                <input
                    type="number"
                    value={quantidadeCotasRifa}
                    onChange={handleInputQuantidadeCota}
                />

                <button className='Save' onClick={handleSubmit}>Salvar</button>
            </div>
        </div>
    );
};
