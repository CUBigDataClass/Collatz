import React, { useEffect, useState, } from 'react'

import { FaCheck, FaWindowClose } from 'react-icons/fa';
import { ImCross } from "react-icons/im";

import './reportDecision.css';



const ReportDecision = () => {
  const[clickcount, setclickcount] = React.useState(0);
  var count = 0;

  window.clickCount = 0;

  const setReportCountPositive = () => {
    window.clickCount+=1;
    console.log(window.clickCount);
  }

  return (
    <div className ="collatz__reportDecision">
        <div className="collatz__reportDecision-content">
            <p> Like this report? </p>
            <h3> Like it to save it to your profile, or generate a new one.</h3>
        </div>
        <div className="collatz__reportDecision-btn">
            <button type="button" onClick={setReportCountPositive}>  <FaCheck size="50px" /> </button>
            <button type="button" onClick={setReportCountPositive}>  <ImCross size="40px" /> </button>
        </div>
    </div>
  )
}

export default ReportDecision