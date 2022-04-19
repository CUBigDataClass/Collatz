import React from 'react';
import './footer.css';

import header_logo from '../../assets/header_logo.png';

const Footer = () => {
  return (
    <div className='gradient__bg'>
      <div className = "collatz__footer section__padding">
        <div className='collatz__footer-logo'>
          <img src={header_logo}/>
        </div>
      </div>
    </div>
  )
}

export default Footer