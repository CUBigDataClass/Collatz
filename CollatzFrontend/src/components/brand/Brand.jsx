import React from 'react';
import { airplane, hotel, attraction, car } from './import';
import './brand.css';

const Brand = () => {
  return (
    <div className='collatz__brand section__padding'>
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

export default Brand