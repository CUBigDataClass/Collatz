import React from 'react';
import './article.css';
import {}  from './import';

const Article = ( { imgUrl, title, subtext } ) => {
  return (
    <div className="collatz__report-container_body">
      <div className="collatz__report-container_body-image">
        <img src={imgUrl} alt="body image" />
      </div>
        Article
        <h2>
          title
        </h2>
        <p>
          subtext
        </p>
    </div>
  )
}

export default Article