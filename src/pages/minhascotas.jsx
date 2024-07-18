import 'react-phone-number-input/style.css';
import { useContext } from 'react';
import { UtilsContext } from './../Providers/utilsProvider';
import { CotasContext } from '../Providers/cotasProviders';
import "../styles/Carrinho/styles.css";

export const MinhasCotas = () => {
  const { isModalOpen, handleCloseModalCotas } = useContext(UtilsContext);
  const { userName, phone, shares, error, handleInputChange, handleSearch } = useContext(CotasContext);

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="carrinhoController">
      <div className="carrinhoCenter">
        <span className="carrinhoClose" onClick={handleCloseModalCotas}>&times;</span>
        <h2>Buscar minhas cotas</h2>
        <div className='carrinhoDivContent'>
          <input
            type="text"
            value={phone}
            onChange={handleInputChange}
            placeholder="Digite o número do telefone"
          />
          <button className='carrinhoBtn' onClick={handleSearch}>Buscar cotas</button>

          {error && <p>{error}</p>}
          
         

          {shares.length > 0 && (
            <div>
            <div className='divTittle'>
              <span className='carrinhoSpan'>Olá {userName}, suas cotas são:</span>
            </div>
            <div className='div'>
              {shares.map((share, index) => (
                <button className='carrinhoNumeroCotas' key={index}>
                  {share}
                </button>
              ))}
            </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};
