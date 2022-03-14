import React from 'react';
import './header.css';
import lowPolyEarth from '../../assets/lowPolyEarth.png';
import { Slider } from '@mui/material';

const Header = () => {
  return (
    <div className="collatz__header section__padding" id="home">
        <div className="collatz__header-content">

          <h1 className="gradient__text">Go Somewhere</h1>
          <p>Search to find vacations within your budget. </p>

          <div className="collatz__header-content_input">
            <input type="Place" placeholder="Your Destination"/>
            <button type="button"> Go </button>
          </div>

          <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />

        </div> 

        <div className="collatz__header-image">
          <img src={lowPolyEarth} alt="lowPolyEarth" />
        </div>

    </div>
  )
}

export default Header