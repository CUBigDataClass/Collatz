import React from 'react';
import { airplane, hotel, attraction, car } from './import';
import './placeholder.css';

const placeholder = () => {
  return (
    <div className='collatz__placeholder section__padding'>
      <div>
        <img src={airplane} alt="airplane icon"/>
      </div>
      <div>
        <img src={hotel} alt="hotel icon"/>
      </div>
      <div>
      <img src={attraction} alt="attraction icon"/>
      </div>  
      <div>
        <img src={car} alt="car icon"/>
      </div>
    </div>
  )
}

export default placeholder