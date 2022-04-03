import React from 'react';
import { Article } from '../../components';
import './report.css';

const Report = () => {
  return (
    <div className="collatz__report section__padding" id="report">
        <div className="collatz__report-heading">
          <h1 className="gradient__text">
            Your Report
          </h1>
        </div>
        <div className="collatz__report-container">
          <div className="collatz__report-container_1">
            <Article />
          </div>
          <div className="collatz__report-container_2">
            <Article />
            <Article />
            <Article />
            <Article />
          </div>
        </div>
    </div>
  )
}

export default Report