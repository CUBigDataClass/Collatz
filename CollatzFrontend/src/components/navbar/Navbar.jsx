import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { NavLink } from "react-router-dom";
import header_logo from '../../assets/header_logo.png';
import './navbar.css';
import {Signin, Signup} from "../../containers";

const Menu = () => (
  <>
    <p><a href="/">Home</a></p>
    <p><NavLink className="nav-link" to="/whatiscollatz"><a>What is Collatz?</a></NavLink></p>
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  //const [login,logstate] = useState(false);
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
         <div className="collatz__navbar-signin">
             <Signin />
         </div>
        <div className="collatz__navbar-signout">
            <Signup />
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