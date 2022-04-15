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
              Recommendation example
          </div>
        </div>
        <div className="collatz__report-container">
          <div className="collatz__report-container_1">
            <Article imgUrl={locationImage} title="Attraction" locationTitle={dataset["attraction"][0]['name']}/>
              {/*<Article imgUrl={locationImage} title="Attraction" locationTitle={"Attraction Title"}/>*/}
          </div>
          <div className="collatz__report-container_2">
              <Article imgUrl={dataset["hotel"]["thumbnailUrl"]} title="Hotels" locationTitle={dataset["hotel"]["name"]}/>
            <Article imgUrl={attractionImage} title="Restaurant" locationTitle={dataset["restaurant"][0]['name']}/>
            <Article imgUrl={flightImage} title="Flights" locationTitle={dataset["flight"]['carrier']}/>
              <Article imgUrl={dataset["rental"]['partner']['logo']} title="Rentals" locationTitle={dataset["rental"]['partner']['name']}/>
          </div>
            <div>
                <h1>Detail Information</h1>
                <p>Attraction</p>
                <p>Attraction location: {dataset["attraction"][0]['vicinity']}</p>
                <p>Hotel</p>
                <p>Total cost: {dataset["total_cost"]}</p>
                <p>Hotel star: {dataset["hotel"]["starRating"]}</p>
                <p>Flight </p>
                <p>Flight lowest TotalFare: {dataset["flight"]['lowestTotalFare']}</p>
                <p>Rental</p>
                <p>Pickup location: {dataset["rental"]["pickup"]["location"]}</p>
                <p>Restaurant</p>
                <p>Restaurant location: {dataset["restaurant"][0]['vicinity']}</p>
            </div>
        </div>
    </div>
  )
}

export default Report