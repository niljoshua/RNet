import { useContext, useEffect, useState  } from "react"
import "../../../styles/Home/Section2/styles.css"
import { Modal } from "../../Modal/modal"
import { UtilsContext } from "../../../Providers/utilsProvider"


export const Section2 = () => {
    const { handleOpenModal, nCotasGeradas, setNCotasGeradas, limiteCotas, inputBloqueado } = useContext(UtilsContext);
    const [showLimiteCotas, setShowLimiteCotas] = useState(false);

    useEffect(() => {        
        const timer = setTimeout(() => {
          setShowLimiteCotas(true);
        }, 700);
           return () => clearTimeout(timer);
      }, []);
    
    const handleIncrement = (increment) => {
        setNCotasGeradas((prev) => {
            const novoValor = Math.min(prev + increment, limiteCotas);
            return novoValor;
        });
    };

    const handleDecrement = () => {
        setNCotasGeradas((prev) => {
            const novoValor = Math.max(0, prev - 1);
            return novoValor;
        });
    };

    const handleChange = (e) => {
        const value = Math.max(0, Math.min(Number(e.target.value), limiteCotas));
        setNCotasGeradas(value);
    };
 
    return (
        <>
        <section>        
        <form>
            <h2>Selecione a quantidade de cotas</h2>
            <div className="btn_n">
                <button type="button" onClick={() => handleIncrement(1)}>+1</button>
                <button type="button" onClick={() => handleIncrement(5)}>+5</button>
                <button type="button" onClick={() => handleIncrement(10)}>+10</button>
                <button type="button" onClick={() => handleIncrement(100)}>+100</button>
            </div>
            
            <div className="btn_plus_minus">
                <button type="button" onClick={handleDecrement}>-</button>
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
                <button type="button" onClick={() => handleIncrement(1)}>+</button>
            </div>               
            <div className="btn_enviar">
            <div>
                {showLimiteCotas && <span>Cotas disponíveis: {limiteCotas}</span>}
            </div>
                <button type="button" disabled={inputBloqueado} onClick={handleOpenModal}>RESERVAR</button>
   
                {showLimiteCotas && limiteCotas <= 0 && <p>As cotas acabaram!</p>}
            </div>
        </form>
                    <Modal />
        </section>
        </>
    )
}