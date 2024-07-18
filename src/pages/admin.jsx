import { useContext } from 'react';
import '../styles/Admin/styles.css';
import { UtilsContext } from '../Providers/utilsProvider';

export const Admin = () => {

    const {valorCotasRifa, quantidadeCotasRifa, handleInputChange, handleInputChangeQ, handleSalvar } = useContext(UtilsContext)

    

    return (
        <div className='AdminController'>
            <div className='AdminDiv1'>
                <span>Escolha o valor da cota</span>
                <input
                type="number"
                value={valorCotasRifa}
                onChange={handleInputChange}
            />

            <span>Escolha a quantidade de cota</span>
            <input
                type="number"
                value={quantidadeCotasRifa}
                onChange={handleInputChangeQ}
            />

            <button onClick={handleSalvar}>Salvar</button>
            </div>
        </div>
    )
}