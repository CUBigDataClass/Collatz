import React from 'react'

import { FaCheck, FaWindowClose } from 'react-icons/fa';
import { ImCross } from "react-icons/im";

import './reportDecision.css';

const reportDecision = () => {
  return (
    <div className ="collatz__reportDecision">
        <div className="collatz__reportDecision-content">
            <p> Like this report? </p>
            <h3> Like it to save it to your profile, or generate a new one.</h3>
        </div>
        <div className="collatz__reportDecision-btn">
            <button type="button">  <FaCheck size="50px" /> </button>
            <button type="button">  <ImCross size="40px" /> </button>
        </div>
    </div>
  )
}

export default reportDecision