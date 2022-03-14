import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import header_logo from '../../assets/header_logo.png';
import './navbar.css';

const Menu = () => (
  <>
    <p><a href="#home">Home</a></p>
    <p><a href="#whatiscollatz">What is Collatz?</a></p>
    <p><a href="#support">Support</a></p>
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="collatz__navbar">
      <div className="collatz__navbar-links">
        <div className="collatz__navbar-links_logo">
          <img src={header_logo} alt="header_logo"/>
        </div>
          <div className="collatz__navbar-links_container">
            <Menu />
          </div> 
        </div>
         <div className="collatz__navbar-sign">
           <p>Sign in</p>
           <button type="button">Sign up</button>
         </div>
         <div className="collatz__navbar-menu">
           {toggleMenu
            ? <RiCloseLine color="#fff" size={27} onClick={()=> setToggleMenu(false)}/>
            : <RiMenu3Line color="#fff" size={27} onClick={()=> setToggleMenu(true)}/>
           }
           {toggleMenu && (
             <div className="collatz__navbar-menu_container scale-up-center">
              <div className="collatz__navbar-menu_container-links"> 
                <Menu />
                <div className="collatz__navbar-menu_container-links-sign">
                <p>Sign in</p>
                <p>Sign up</p>
                </div>
              </div>
             </div>
           )}
         </div>
      
    </div>
  )
}

export default Navbar