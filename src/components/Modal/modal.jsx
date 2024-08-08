import '../Modal/modal.css';
import InputMask from 'react-input-mask';
import { useContext } from 'react';
import { UtilsContext } from '../../Providers/utilsProvider';

// eslint-disable-next-line react/prop-types
export const Modal = () => {
    const { register, errors, modalRef, modalOpen, handleSubmit, onSubmit, handleCloseModal, handleOpenConfirmModal } = useContext(UtilsContext);

    const handleFormSubmit = (formData) => {
        onSubmit(formData);  // Chama a função original para lidar com a submissão
        handleOpenConfirmModal();  // Abre o segundo modal
    };
        
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={`modal ${modalOpen ? 'open' : ''}`}>
            <div className="modal-content" ref={modalRef}>
                <div className='modal-top'>
                    <span>Seus dados</span>
                    <span className='X' onClick={handleCloseModal}>X</span>        
                </div>

                <input placeholder='Seu nome' {...register("name")} />
                {errors.name ? <p>{errors.name.message}</p> : null}

                <InputMask
                    mask="(99) 99999-9999"
                    {...register("phone")}
                    placeholder="(99) 99999-9999"
                />
                {errors.phone ? <p>{errors.phone.message}</p> : null}

                <button type='submit' className="footerConfirm" id="" data-bs-toggle="modal" data-bs-target="#confirmPurchase">Confirmar</button>

            </div>                
        </form>
    );
};
