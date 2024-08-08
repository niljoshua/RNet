import { useContext, useEffect, useState } from 'react';
import { UtilsContext } from '../../Providers/utilsProvider';
import '../Modal/modal.css'; 

import { toast } from 'react-toastify';

export const ModalConfirmacao = () => {
    const { modalOpenConfirm, handleCloseConfirmModal, pixData, clearPixData } = useContext(UtilsContext);

    const [timeLeft, setTimeLeft] = useState(0);

    const notify = () => {
        toast.info("QR Code copiado para a área de transferência!");
    }

    useEffect(() => {
        if (pixData && pixData.hora !== undefined && pixData.minuto !== undefined && pixData.segundo !== undefined) {
            const currentTime = new Date();
            const startHour = parseInt(pixData.hora, 10);
            const startMinute = parseInt(pixData.minuto, 10);
            const startSecond = parseInt(pixData.segundo, 10);

            if (isNaN(startHour) || isNaN(startMinute) || isNaN(startSecond)) {

                return;
            }

            const startDate = new Date(
                currentTime.getFullYear(),
                currentTime.getMonth(),
                currentTime.getDate(),
                startHour,
                startMinute,
                startSecond
            );
            const endDate = new Date(startDate.getTime() + 10 * 60 * 1000);

            const updateTimer = () => {
                const now = new Date();
                const diff = endDate - now;
                if (diff <= 0) {
                    setTimeLeft(0);
                    handleCloseConfirmModal(); 
                    clearPixData(); 
                } else {
                    setTimeLeft(Math.floor(diff / 1000));
                }
            };

            updateTimer();
            const timerId = setInterval(updateTimer, 1000);

            return () => clearInterval(timerId);
        } 
    }, [pixData, handleCloseConfirmModal, clearPixData]);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                notify();
            })
    };


    const formatTimeLeft = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <>
            <div className={`modal ${modalOpenConfirm ? 'open' : ''}`}>
                <div className="modal-content">
                    <div className='modal-top'>
                        <h1>Dados do Pix</h1>
                        <span className='X' onClick={handleCloseConfirmModal}>X</span>        
                    </div>

                    <div>
                        {pixData ? (
                            <div className='modal_qr_code'>
                                <div>
                                    <p className='time_qr_code'>Tempo restante: <span>{formatTimeLeft(timeLeft)}</span></p>
                                </div>
                                <p>Total a pagar:<span className='qr_code_total'> R$ {pixData.total}</span></p>
                                <div className='img_area_qr_code'>                
                                    <img 
                                        className='img_qr_code'
                                        src={`data:image/png;base64,${pixData.qr_code_base64}`} 
                                        alt="QR Code" 
                                        style={{ width: '200px', height: '200px' }} 
                                    />
                                </div>

                                <div>
                                    <input 
                                        type="text" 
                                        className='input_qr_code'
                                        value={pixData.qr_code} 
                                        readOnly 
                                        style={{ width: '100%', marginBottom: '10px' }} 
                                    />
                                    <button className='btn_copiar' onClick={() => copyToClipboard(pixData.qr_code)}>Copiar QR Code</button>
                                </div>
                            </div>
                        ) : (
                            <p>Gerando dados de pix</p>
                        )}
                    </div>
                </div>
            </div>

            
        </>
    );
};
