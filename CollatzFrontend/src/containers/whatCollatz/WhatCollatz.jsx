import React from 'react';
import './whatCollatz.css';
import { Navbar } from '../../components';
import lowPolyEarth from "../../assets/lowPolyEarth.png";

const WhatCollatz = () => {
  return (
    <div className="gradient__bg">
        <div className="WhatCollatz">
            <>
                <Navbar/>
            </>
            <div className="collatz__header section__padding" id="home">
                <div className="collatz__header-content">
                    <h1 >What is Collatz</h1>
                    <p>
                        Collatz is a web app for planning travel on a set budget. 
                        Collatz finds flights, hotels, attractions and transport at your travel destination within your set budget. The front of this project is made with React.js and Python, using Google APIs.
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}


export default WhatCollatz