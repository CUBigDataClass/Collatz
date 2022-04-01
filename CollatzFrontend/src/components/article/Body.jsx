import React from 'react';
import './body.css';
import {}  from './import';

const Body = ( { imgUrl, title, subtext } ) => {
  return (
    <div className="collatz__report-container_body">
      <div className="collatz__report-container_body-image">
        <img src={imgUrl} alt="body image" />
      </div>
        Body
        <h2>
          title
        </h2>
        <p>
          subtext
        </p>
    </div>
  )
}

export default Body