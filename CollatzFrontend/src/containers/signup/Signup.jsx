import React from 'react';
import './signup.css';
import {NavLink} from "react-router-dom";

const Signup = () => {
    return (
        <div className="Signup">
            <div className="container">
                <h2>Welcome to Collatz New Friend!</h2>
                <div className="input-box">
                    <label >Email</label>
                    <input type = "text"></input>
                </div>
                <div className="input-box">
                    <label >Password</label>
                    <input type = "password"></input>
                </div>
                <div classname="click-btn">
                    <button ><p><NavLink className="nav-link" to="/"><a>Finish</a></NavLink></p></button>
                </div>
                <div className="click-btn">
                    <p><NavLink className="nav-link" to="/signin"><a>Already have account?</a></NavLink></p>
                </div>
            </div>
        </div>

    );
}


export default Signup
