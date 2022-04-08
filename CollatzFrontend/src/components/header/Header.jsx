import React, { useEffect, useState, } from 'react'
import './header.css';
import lowPolyEarth from '../../assets/lowPolyEarth.png';
import { Slider, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';

const Header = () => {
  
  /* Slider value */
  const [value, setValue] = React.useState(5000);

  function valueLabelFormat(value) {
    const units = ['$'];
    let unitIndex = 0;
    return `${units[unitIndex]} ${value} `;
  };

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }
  };

  /*Leave date value */
  

  /*Return date value */


  /*Scrolling parallax */
  const [offsetY, setOffsetY] = useState(0); /*offsetY = 0; # pixels scrolled from top of page to bottom*/
  const handleScroll = () => setOffsetY(window.pageYOffset);
  
  useEffect(() => {
    window.addEventListener("scroll",handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="collatz__header section__padding" id="home">
        <div className="collatz__header-content">
          <h1 className="gradient__text">Go Somewhere New</h1>
          <p>Instantly plan trips within a set budget. </p>
          <div className="collatz__header-slider">
            <Typography id="budget-slider" >
                Budget: {valueLabelFormat(value)}
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
          <div className="collatz__header-content_date_input">
            <div className="collatz__header-content_date_input_container">
              <p>Leave</p>
              <div className='collatz__datePicker'>
              <DatePicker />
              </div>
            </div>
            <div className="collatz__header-content_date_input_container">
              <p>Return</p>
              <div className='collatz__datePicker'>
                <DatePicker/>
              </div>
            </div>
              <div className="collatz__header-content_date_input_container">
              <p># of Travelers</p>
              <input type="text" placeholder=""/>
              <div className='collatz__travelerCountPicker'>
              </div>
            </div>
          </div>
          <div className="collatz__header-content_input">
            <input type="text" placeholder="Your Destination"/>
            <button type="button" > Go </button>
          </div>
          
        </div> 
        <div className="collatz__header-image"
        style={{ transform: `translateY(${(offsetY * 0.15)}px)`}}
        >
          <img src={lowPolyEarth} alt="lowPolyEarth" />
        </div>
    </div>
  )
}

export default Header