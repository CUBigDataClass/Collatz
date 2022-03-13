import React from 'react';
import { RiMenu3Line, RiCloseLin } from 'react-icons/ri';
import header_logo from '../../assets/header_logo.png';
import './navbar.css';

const Navbar = () => {
  return (
    <div className="collatz__navbar">
      <div className="collatz__navbar--links">
        <div className="collatz__navbar-links_logo">
          <img src={header_logo} alt="header_logo"/>
        </div>
      </div>
    </div>
  )
}

export default Navbar