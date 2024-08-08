import { useContext, useEffect, useState } from "react";
import "../../../styles/Home/Section2/styles.css";
import { Modal } from "../../Modal/modal";
import { UtilsContext } from "../../../Providers/utilsProvider";
import { UsuarioContext } from "../../../Providers/dataProviders";
import { ModalConfirmacao } from "../../Modal/modalPagamento";

export const Section2 = () => {
  const { handleOpenModal, nCotasGeradas, setNCotasGeradas, inputBloqueado, valorTotalCotas } = useContext(UtilsContext);
  const { limiteCotas } = useContext(UsuarioContext);
  const [showLimiteCotas, setShowLimiteCotas] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLimiteCotas(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleIncrement = (increment) => {
    setNCotasGeradas((prev) => Math.min(prev + increment, limiteCotas));
  };

  const handleDecrement = () => {
    setNCotasGeradas((prev) => Math.max(0, prev - 1));
  };

  const handleChange = (e) => {
    const value = Math.max(0, Math.min(Number(e.target.value), limiteCotas));
    setNCotasGeradas(value);
  };

  // Condição para desabilitar o botão de reservar
  const isReserveButtonDisabled = nCotasGeradas === 0 || limiteCotas === 0 || inputBloqueado;

  return (
    <section>
      <form>
        <h2>Selecione a quantidade de cotas</h2>
        <div className="btn_n">
          <button type="button" onClick={() => handleIncrement(1)} disabled={inputBloqueado}>+1</button>
          <button type="button" onClick={() => handleIncrement(5)} disabled={inputBloqueado}>+5</button>
          <button type="button" onClick={() => handleIncrement(10)} disabled={inputBloqueado}>+10</button>
          <button type="button" onClick={() => handleIncrement(100)} disabled={inputBloqueado}>+100</button>
        </div>
        <div className="btn_plus_minus">
          <button type="button" onClick={handleDecrement} disabled={inputBloqueado}>-</button>
          <input 
            type="number" 
            value={nCotasGeradas} 
            onChange={handleChange} 
            placeholder="1" 
            min="0" 
            max={limiteCotas} 
            disabled={inputBloqueado} 
            aria-label="Quantidade de cotas" 
          />
          <button type="button" onClick={() => handleIncrement(1)} disabled={inputBloqueado}>+</button>
        </div>
        <div className="btn_enviar">
          <div>
            {showLimiteCotas && <span>Cotas disponíveis: {limiteCotas}</span>}
            {valorTotalCotas > 0 && <span>Valor total das cotas: {valorTotalCotas.toFixed(2)}</span>}
          </div>
          <button type="button" disabled={isReserveButtonDisabled} onClick={handleOpenModal}>RESERVAR</button>
          {showLimiteCotas && limiteCotas <= 0 && <p>As cotas acabaram!</p>}
        </div>
      </form>
      <Modal />
      <ModalConfirmacao />
    </section>
  );
};
