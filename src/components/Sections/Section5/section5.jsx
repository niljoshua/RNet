import { Modal } from "../../Modal/modal";
import { useContext } from "react"
import { UtilsContext } from './../../../Providers/utilsProvider';

export const Section5 = () => {

  const { valorTotal, cotas, setCotas, numeroCotas, setBlockedNumbers, blockedNumbers, setModalOpen, modalOpen, handleOpenModal, handleCloseModal, handleButtonClick, handleConfirmClick } = useContext(UtilsContext)

    return (
        <>              
            <section className="divSection5_2">
                <div className="divMain" style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px' }}>
                    {Array.from({ length: numeroCotas }, (_, i) => i + 1).map(number => (
                        <button
                            key={number}
                            onClick={() => handleButtonClick(number)}
                            style={{
                            backgroundColor: blockedNumbers.includes(number)
                                ? 'red'
                                : cotas.includes(number)
                                ? 'green'
                                : 'lightgrey'
                            }}>
                            {number}
                        </button>
                        ))}
                    </div>
                    {cotas.length === 0 ? (
                        <div className="footerController desaparecer" id="">
                        <div className=""><div className=""><div className="">
                            <p className="footerQuant">Quantidade de bilhetes: <span id="numbersSelectedQuant"></span>{cotas.length}</p>
                            <p className="">Valor total: R$ {valorTotal}<span className="footerValue" id="numbersSelectedAmount"></span></p>
                        <div className="">
                        
                            <button  className="footerConfirm"  onClick={handleOpenModal}>Confirmar</button>
            
                          <Modal isOpen={modalOpen} onClose={handleCloseModal} setModalOpen={setModalOpen} cotas={cotas} blockedNumbers={blockedNumbers} setCotas={setCotas} setBlockedNumbers={setBlockedNumbers} handleConfirmClick={handleConfirmClick}/>
                        </div></div></div></div></div>
                ) : (
                    
               
                    <div className="footerController aparecer" id="">
                        <div className=""><div className=""><div className="">
                            <p className="footerQuant">Quantidade de bilhetes: <span id="numbersSelectedQuant"></span>{cotas.length}</p>
                            <p className="">Valor total: R$ {valorTotal}<span className="footerValue" id="numbersSelectedAmount"></span></p>
                        <div className="">
                        
                            <button  className="footerConfirm"  onClick={handleOpenModal}>Confirmar</button>
            
                          
                        </div></div></div></div></div>
                       )}
                       <Modal isOpen={modalOpen} onClose={handleCloseModal} cotas={cotas} blockedNumbers={blockedNumbers} setCotas={setCotas} setBlockedNumbers={setBlockedNumbers} handleConfirmClick={handleConfirmClick}/>
                    </section>                
        </>
    )
}