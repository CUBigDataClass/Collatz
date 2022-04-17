import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { NavLink } from "react-router-dom";
import header_logo from '../../assets/header_logo.png';
import './navbar.css';

const Menu = () => (
  <>

    <p><a href="/">Home</a></p>
    <p><NavLink className="nav-link" to="/whatiscollatz"><a>What is Collatz?</a></NavLink></p>
    <p><NavLink className="nav-link" to="/support"><a>Support</a></NavLink></p>
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
             <p><NavLink className="nav-link" to="/signin"><a>Sign in</a></NavLink></p>
           <button type="button"><NavLink className="nav-link" to="/signup"><a>Sign up</a></NavLink></button>
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