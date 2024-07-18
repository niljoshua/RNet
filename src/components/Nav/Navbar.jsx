import styled from 'styled-components';
import Burger from './Burguer';


const Nav = styled.nav`
  
  height: 64px;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  padding-left: 1rem;
  padding-right: 1rem;
  position: fixed;
  z-index: 30;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  -webkit-box-shadow: 2px 4px 5px 0px rgba(0,0,0,0.1);
-moz-box-shadow: 2px 4px 5px 0px rgba(0,0,0,0.1);
box-shadow: 2px 4px 5px 0px rgba(0,0,0,0.1);
text-decoration: none;
  
  .logo {
    color: #0D2538;
    display: flex;
    cursor: pointer;
    align-items: center;
    text-decoration: none;
  }

  span {
  text-decoration: none;
  color: #0D2538;
  font-weight: bold;
  font-size: 1.5rem;
  }
`

export const Navbar = () => {
  return (
    <Nav>
      <div className="logo">
      <a href='/'><span>RifasNet</span></a>
      </div>
      
      <Burger />
    </Nav>
  )
}
