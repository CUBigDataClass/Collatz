import React from 'react';
import './whatCollatz.css';
import header_logo from "../../assets/header_logo.png";
import lowPolyEarth from "../../assets/lowPolyEarth.png";
import {NavLink} from "react-router-dom";

const WhatCollatz = () => {
  return (
      <div className="WhatCollatz">
          <div className="container">
                <div className="collatz__navbar-signin"><button>
                    <NavLink to={"/"}>Back</NavLink>
                </button>
                </div>
                  <div className="collatz__navbar-links_logo">
                      <br></br>
                      <img src={header_logo} alt="header_logo"/>
                  </div>
                    <div>
                      <h1 >What is Collatz</h1>
                      <p>
                          <br></br>
                          Collatz Introduction <br></br>
                          <br></br>
                          Collatz is a website for users who are interested in the travel around the world.
                          In this website, users can search the goal position with key words.
                          For example, if users are interested in some specific scenic spots, such as mountains,
                          they can fill in the corresponding keywords in the search bar.
                          Our website can find the places associated with the keywords from the database.
                          Back to the user interface, users can select the places they are interested in.
                          The website also includes three categories: the name of the hotel in the target location,
                          relevant flight information and rent. At the same time, the website can also search through the amount of budget,
                          so that users can freely choose their favorite travel location without worrying about budget overruns.
                          I hope users can have a perfect user experience in Collatz.
                      </p>

                  </div>
              <div className="collatz-image">
                  <img src={lowPolyEarth} alt="lowPolyEarth" />
              </div>

          </div>
      </div>
  );
}


export default WhatCollatz