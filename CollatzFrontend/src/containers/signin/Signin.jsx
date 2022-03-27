import React from 'react';
import './signin.css';
import {NavLink} from "react-router-dom";

const Signin = () => {
    return (
        <div className="Signin">
            <div className="container">
                <h2>Welcome to Collatz</h2>
                <div className="input-box">
                    <label >Email</label>
                    <input type = "text"></input>
                </div>
                <div className="input-box">
                    <label >Password</label>
                    <input type = "password"></input>
                </div>
                <div classname="click-btn">
                    <button ><p><NavLink className="nav-link" to="/"><a>Sign in</a></NavLink></p></button>
                </div>
                <div classname="click-btn">
                    <button ><p><NavLink className="nav-link" to="/signup"><a>I am new here</a></NavLink></p></button>
                </div>
            </div>
        </div>

    );
}


export default Signin


