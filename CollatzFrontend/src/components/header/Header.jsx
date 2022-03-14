import React from 'react';
import './header.css';
import lowPolyEarth from '../../assets/lowPolyEarth.png';
import { Slider, Typography, Grid } from '@mui/material';

const Header = () => {
  const [value, setValue] = React.useState(4321);

  function calculateValue(value) {
    return  value;
  }

  function valueLabelFormat(value) {
    const units = ['$'];
    let unitIndex = 0;
  
    return `${units[unitIndex]} ${value} `;
  }

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }
  };

  return (
    <div className="collatz__header section__padding" id="home">
        <div className="collatz__header-content">

          <h1 className="gradient__text">Go Somewhere New</h1>
          <p>Instantly plan trips within a set budget. </p>
          <div className="collatz__header-slider">
            <Typography id="budget-slider" >
                Budget: {valueLabelFormat(calculateValue(value))}
            </Typography>
            <Slider
              size='medium'
              value={value}
              min={10}
              step={1}
              max={15000}

              getAriaValueText={valueLabelFormat}
              valueLabelFormat={valueLabelFormat}
              onChange={handleChange}
              aria-labelledby="budget-slider"
            />
          </div>
          <div className="collatz__header-content_input">
            <input type="Place" placeholder="Your Destination"/>
            <button type="button"> Go </button>
          </div>

          
         

        </div> 

        <div className="collatz__header-image">
          <img src={lowPolyEarth} alt="lowPolyEarth" />
        </div>

    </div>
  )
}

export default Header