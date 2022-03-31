import React from 'react';
import './whatCollatz.css';
import header_logo from "../../assets/header_logo.png";
import { Navbar } from '../../components';
import lowPolyEarth from "../../assets/lowPolyEarth.png";
import {NavLink} from "react-router-dom";

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
                        Users can search for a desired travel location with key words, and recieve flights, hotels, attractions and travel options in that area that fit within their budget.
                        Try it out for yourself, and if you like a trip, save it to your user profile to view it at a later date!
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}


export default WhatCollatz