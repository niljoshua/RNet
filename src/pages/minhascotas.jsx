import InputMask from 'react-input-mask';
import { useContext } from 'react';
import { CotasContext } from '../Providers/cotasProviders';
import "../styles/Carrinho/styles.css";

export const MinhasCotas = () => {
    const { userName, phone, shares, error, handleInputChange, handleSearch, isModalOpen, handleCloseModalCotas } = useContext(CotasContext);

    if (!isModalOpen) {
        return null;
    }

    // Garantir que `shares` seja um array
    const safeShares = Array.isArray(shares) ? shares : [];

    return (
        <div className="carrinhoController">
            <div className="carrinhoCenter">
                <span className="carrinhoClose" onClick={handleCloseModalCotas} aria-label="Fechar modal">&times;</span>
                <h2>Buscar minhas cotas</h2>
                <div className='carrinhoDivContent'>
                    <InputMask
                        mask="(99) 99999-9999"
                        value={phone}
                        onChange={handleInputChange}
                        placeholder="Digite o número do telefone"
                        aria-label="Número do telefone"
                    />
                    <button className='carrinhoBtn' onClick={handleSearch} aria-label="Buscar cotas">Buscar cotas</button>

                    {error && <p className='error'>{error}</p>}

                    {safeShares.length > 0 ? (
                        <div>
                            <div className='divTittle'>
                                <span className='carrinhoSpan'>Olá {userName}, suas cotas são:</span>
                            </div>
                            <div className='div'>
                                {safeShares.map((share, index) => (
                                    <button className='carrinhoNumeroCotas' key={index}>
                                        {share}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
        </div>
    );
};
