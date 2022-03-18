import React from 'react';
import './body.css';
import {}  from './import';

const Body = ( { imgUrl } ) => {
  return (
    <div className="collatz__report-container_body">
      <div className="collatz__report-container_body-image">
        <img src={imgUrl} alt="body image" />
      </div>
        Body
    </div>
  )
}

export default Body