import React from 'react';
import './support.css';
import header_logo from "../../assets/header_logo.png";
import lowPolyEarth from "../../assets/lowPolyEarth.png";
import {NavLink} from "react-router-dom";


const Support = () => {
    return (
        <div className="Support">
            <div class="container">
                <div className="collatz__navbar-signin"><button>
                    <NavLink to={"/"}>Back</NavLink>
                </button>
                </div>
                <div className="collatz__navbar-links_logo">
                    <br></br>
                    <img src={header_logo} alt="header_logo"/>
                </div>
                <div>
                        <h1 >Support Page</h1>
                        <p>
                            <br></br>
                            You can find support here:
                        </p>
                </div>
                <div className="collatz-image">
                    <img src={lowPolyEarth} alt="lowPolyEarth" />
                </div>
            </div>
        </div>
    );
}


export default Support