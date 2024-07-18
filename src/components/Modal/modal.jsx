import '../Modal/modal.css';

import 'react-phone-number-input/style.css';

import { useContext} from 'react';
import { UtilsContext } from '../../Providers/utilsProvider';


// eslint-disable-next-line react/prop-types
export const Modal = () => {

    const { register, errors , modalRef, modalOpen, handleSubmit, onSubmit, handleCloseModal } = useContext(UtilsContext)
        
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`modal ${modalOpen ? 'open' : ''}`}>
            <div className="modal-content" ref={modalRef}>
                <div className='modal-top'>
                    <span>Informe o seu nome e numero de telefone</span>
                    <button className='X' onClick={handleCloseModal}>X</button>        
                </div>

            <input placeholder='Seu nome'  {...register("name")}/>
            {errors.name ? <p>{errors.name.message}</p> : null}                
            <input placeholder='(99)999999999'  {...register("phone")}/>                
            {errors.phone ? <p>{errors.phone.message}</p> : null}
            

            <button type='submit' className="footerConfirm" id="" data-bs-toggle="modal" data-bs-target="#confirmPurchase" >Confirmar</button>
                
            </div>
        </form>
    );
};