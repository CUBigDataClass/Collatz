import React from 'react';
import './article.css';
import {}  from './import';

const Article = ( { imgUrl, title, locationTitle } ) => {
  return (
    <div className="collatz__report-container_article">
      <div className="collatz__report-container_article-image">
        <img src={imgUrl} alt="article image" />
      </div>
      <div className="collatz__report-container_article-content">
        <div>
          <p> {title} </p>
          <h3> {locationTitle} </h3>
        </div>
      </div>
    </div>
  )
}

export default Article