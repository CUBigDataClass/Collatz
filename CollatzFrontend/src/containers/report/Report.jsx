import React from 'react';
import { Article } from '../../components';
import { locationImage, hotelImage, flightImage, rentalImage, attractionImage } from './imports';
import './report.css';
import data from './example_recs.json';

const Report = () => {

    const dataset = data["recs"][0]

  return (
    <div className="collatz__report section__padding" id="report">
        <div className="collatz__report-heading">
          <h1>
            Here's Your Report
          </h1>
          <div className="collatz__report-subheading">
              San Fransico, CA
          </div>
        </div>
        <div className="collatz__report-container">
          <div className="collatz__report-container_1">
            <Article imgUrl={attractionImage} 
            title="Attraction" 
            articleTitle={dataset["attraction"][0]['name']} 
            articleInfo={dataset["attraction"][0]['vicinity']}
            />
          </div>
          <div className="collatz__report-container_2">
              <Article imgUrl={dataset["hotel"]["thumbnailUrl"]} 
              title="Hotels" 
              articleTitle ={dataset["hotel"]["name"]} 
              articleInfo = {dataset["total_cost"]}
              articleInfo2 = {dataset["hotel"]["starRating"]}
              />
              <Article imgUrl={attractionImage} 
              title="Restaurant" 
              articleTitle={dataset["restaurant"][0]['name']}
              articleInfo={dataset["restaurant"][0]['vicinity']}
              />
              <Article imgUrl={flightImage} 
              title="Flights" 
              articleTitle={dataset["flight"]['carrier']}
              articleInfo={dataset["flight"]['lowestTotalFare']}
              />
              <Article imgUrl={dataset["rental"]['partner']['logo']} 
              title="Rentals" 
              articleTitle={dataset["rental"]['partner']['name']}
              articleInfo={dataset["rental"]["pickup"]["location"]}
              />
          </div>
        </div>
    </div>
  )
}

export default Report