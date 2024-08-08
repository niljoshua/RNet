import { useContext } from 'react';
import styled from 'styled-components';
import { CotasContext } from '../../Providers/cotasProviders';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
text-decoration: none;

  li {
    padding: 18px 10px;
    color: #0D2538;
    cursor: pointer;
    text-decoration: none; 
  }
  
  a {
    text-decoration: none;
  }

.cotas {
    font-size: .875rem;
    line-height: 1.25rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    border-width: 1px;
    border-radius: 9999px;
    gap: .5rem;
    align-items: center;
    display: flex;
    cursor: pointer;
    -webkit-appearance: button;
    background-color: transparent;
    background-image: none;
    text-transform: none;
    font-family: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    margin: 0;
    text-decoration: none;
    color: black;
    box-sizing: border-box;
    border-style: solid;
    border-color: #e5e7eb;
}

.cotas:hover {
  background-color: #f1f1f0;
}

  @media (max-width: 768px) {
        flex-flow: column nowrap;
        background-color: #0D2538;
        position: fixed;
         transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
        top: 65px;
        right: 0;
        height: 60px;
        width: 100%;
        padding-top: 10px;
        transition: transform 0.3s ease-in-out;
        text-decoration: none;

    li {
      color: #fff; 
    }
   
    a {
      text-decoration: none;
      
    }

    .cotas {
        color: #0D2538;
        background-color: #f1f1f0;
        left: 15px;
        position: absolute;
    } 
    
    .cotas:hover {
      color: #0D2538;
      background-color: #fff;
    } 
  }
`;

const RightNav = ({ open }) => {

  const { handleOpenModalCotas } = useContext(CotasContext);

  return (
    <Ul open={open} >
      <button className='cotas' onClick={handleOpenModalCotas}>🔎 Minhas cotas</button>
    </Ul>
  )
}

export default RightNav