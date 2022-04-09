import React, { useEffect, useState } from 'react'
import './whatCollatz.css';
import { Navbar } from '../../components';
import lowPolyEarth from "../../assets/lowPolyEarth.png";

const WhatCollatz = () => {

/*Scrolling parallax */
  const [offsetY, setOffsetY] = useState(0); /*offsetY = 0; # pixels scrolled from top of page to bottom*/
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll",handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="WhatCollatz">
        <div className="footer-gradient">
            <div className="gradient__bg">
                <>
                    <Navbar/>
                </>
                <div className="collatz__header section__padding" id="home">
                    <div className="collatz__header-content">
                        <h1 >What is Collatz</h1>
                        <p>
                            Collatz is a web app for planning travel on a set budget.
                            Collatz finds flights, hotels, attractions and transport at your travel destination within your set spending limit. The front end of this project is built with React.js and the back end is built in Python with the help of Google APIs.
                        </p>
                    </div>
                </div>
                <div className="collatz__about-image">
                    <img src={lowPolyEarth} alt="lowPolyEarth"
                     style={{ transform: `translateY(${(offsetY * 0.15)}px)`}}
                     />
                </div>
            </div>
            <div className="collatz__about-image">
                <img src={lowPolyEarth} alt="lowPolyEarth" />
            </div>
        </div>
    </div>
  );
}


export default WhatCollatz
