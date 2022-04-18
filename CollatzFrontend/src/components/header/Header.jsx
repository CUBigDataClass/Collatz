import React, { useEffect, useState, useRef} from 'react'
import './header.css';
import lowPolyEarth from '../../assets/lowPolyEarth.png';
import { Slider, Typography } from '@mui/material';

const Header = () => {

  const [leaveDate, setLeaveDate] = React.useState();
  const [returnDate, setReturnDate] = React.useState();
  const [travelerCount, setTravelerCount] = React.useState(0);
  const[travelFrom, setTravelFrom] = React.useState('');
  const[travelTo, setTravelTo] = React.useState('');
  const[jsondata,setjsondata] = React.useState('');

  const getTravelerCount = (event)=>{
    setTravelerCount(event.target.value) 
  };

  const getTravelFrom = (event)=>{
    setTravelFrom(event.target.value) 
  };

  const getTravelTo = (event)=>{
    setTravelTo(event.target.value) 
  };

  const getLeaveDate = (event)=>{
    setLeaveDate(event.target.value) 
  };

  const getReturnDate = (event)=>{
    setReturnDate(event.target.value) 
  };

  async function getData(data) {
    setjsondata(data)
    window.recs = jsondata
    //console.log(jsondata)
  }

  const callAPI = (event)=> {
    //const traveler=getTravelerCount();
    console.log("Button Press")
    console.log(travelerCount)
    console.log(travelFrom)
    console.log(travelTo)
    window.travelToLocation = travelTo
    console.log(leaveDate)
    console.log(returnDate)

    fetch(`http://34.83.14.233:80/users/hotels/${window.username}?starting_loc=${travelFrom}&destination=${travelTo}&start_date=${leaveDate}&end_date=${returnDate}&adult_count=${travelerCount}&child_count=0`)
      .then(console.log("hotels"))
    fetch(`http://35.190.178.224:80/users/flights/${window.username}?starting_loc=${travelFrom}&destination=${travelTo}&start_date=${leaveDate}&end_date=${returnDate}&adult_count=${travelerCount}&child_count=0`)
      .then(console.log("flights"))
    fetch(`http://35.199.105.57:80/users/places/${window.username}?starting_loc=${travelFrom}&destination=${travelTo}&start_date=${leaveDate}&end_date=${returnDate}&adult_count=${travelerCount}&child_count=0`)
      .then(console.log("places"))
    fetch(`http://34.176.192.110:80/users/rentals/${window.username}?starting_loc=${travelFrom}&destination=${travelTo}&start_date=${leaveDate}&end_date=${returnDate}&adult_count=${travelerCount}&child_count=0`)
      .then(console.log("rentals"))
    fetch(`http://35.202.91.190:80/users/recs/${window.username}?starting_loc=${travelFrom}&destination=${travelTo}&start_date=${leaveDate}&end_date=${returnDate}&adult_count=${travelerCount}&child_count=0`)
      .then(data => console.log(data))
    fetch(`http://35.202.91.190:80/users/recs/${window.username}?starting_loc=${travelFrom}&destination=${travelTo}&start_date=${leaveDate}&end_date=${returnDate}&adult_count=${travelerCount}&child_count=0`)
        .then(response => response.json())
        .then(data => getData(data))
        .then(console.log("Finished"))

    window.scrollBy(0,850)
  };

  
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
            <div className='collatz__header-content_input-top-row'>
              <div className="collatz__header-content_input-container">
                Leave On
                <input type="date" 
                placeholder="Leave On"
                onChange={getLeaveDate}
                />
              </div>
              <div className="collatz__header-content_input-container">
                Return By
                <input type="date" 
                placeholder="Return On"
                onChange={getReturnDate}
                />
              </div>
              <div className="collatz__header-content_input-container">
                # of Travelers
                <input type="number" 
                placeholder="# of Travelers"
                onChange={getTravelerCount}
                min="1"
                />
              </div>
            </div>
            <div className="collatz__header-content_input">
              <input type="text" 
              placeholder="Traveling From"
              onChange={getTravelFrom}
              />
            </div>
            <div className="collatz__header-content_input">
              <input type="text" 
              placeholder="Traveling To"
              onChange={getTravelTo}
              />
              <button type="button" onClick={callAPI} > Go </button>
              {/*<Download/>*/}
            </div>
          </div> 
        <div className="collatz__header-image"
        style={{ transform: `translateY(${(offsetY * 0.1)}px)`}}
        >
          <img src={lowPolyEarth} alt="lowPolyEarth" />
        </div>
    </div>
  )
}

export default Header