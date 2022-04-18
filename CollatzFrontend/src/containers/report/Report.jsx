import React, { useEffect, useState} from 'react'
import { Article } from '../../components';
import { locationImage, hotelImage, flightImage, rentalImage, attractionImage } from './imports';
import './report.css';
import data from './example_recs.json';


import { FaCheck } from 'react-icons/fa';
import { ImCross } from "react-icons/im";

var count1 = 0;
const Report = () => {
  
  const [count, setCount] = React.useState(0);


  const getCount = () => {
    count1 = count1+1;
    setCount(count1)
  }

  const dataset = data["recs"][count];

  return (
    <div className='collatz__report container'>
      <div className="collatz__report section__padding">
          <div className="collatz__report-heading">
            <h1>
              Here's Your Report
            </h1>
            <div className="collatz__report-subheading">
                {window.travelToLocation}
                {console.log(window.travelToLocation)}
            </div>
          </div>
          <div className="collatz__report-container">
            <div className="collatz__report-container_1">
              <Article imgUrl={attractionImage} 
              title="Attractions" 
              articleTitle={dataset["attraction"][0]['name']}
              articleInfo={dataset["attraction"][0]['vicinity']}
              articleTitle1={dataset["attraction"][1]['name']}
              articleInfo1={dataset["attraction"][1]['vicinity']}
              articleTitle2={dataset["attraction"][2]['name']}
              articleInfo2={dataset["attraction"][2]['vicinity']}
              />
            </div>
            <div className="collatz__report-container_2">
                <Article imgUrl={dataset["hotel"]["thumbnailUrl"]} 
                title="Hotels" 
                articleTitle ={dataset["hotel"]["name"]}
                articleInfo = {"Total cost: "+dataset["total_cost"]}
                articleInfo2 = {"Stars: "+dataset["hotel"]["starRating"]}
                />
                <Article imgUrl={attractionImage} 
                title="Restaurants" 
                articleTitle={dataset["restaurant"][0]['name']}
                articleInfo={dataset["restaurant"][0]['vicinity']}
                articleTitle1={dataset["restaurant"][1]['name']}
                articleInfo1={dataset["restaurant"][1]['vicinity']}
                articleTitle2={dataset["restaurant"][2]['name']}
                articleInfo2={dataset["restaurant"][2]['vicinity']}
                />
                <Article imgUrl={dataset["flight"]['logo']}
                title="Flights" 
                articleTitle={dataset["flight"]['carrier']}
                articleInfo={"Lowest Cost Available: "+ dataset["flight"]['lowestTotalFare']}
                />
                <Article imgUrl={dataset["rental"]['partner']['logo']} 
                title="Rentals" 
                articleTitle={dataset["rental"]['partner']['name']}
                articleInfo={dataset["rental"]["pickup"]["location"]}
                />
            </div>
          </div>
      </div>
      <div className ="collatz__reportDecision">
        <div className="collatz__reportDecision-content">
            <p> Like this report? </p>
            <h3> Like it to save it to your profile, or generate a new one.</h3>
        </div>
        <div className="collatz__reportDecision-btn">
            <button type="button" onClick={getCount}>  <FaCheck size="50px" /> </button>
            <button type="button" onClick={getCount}>  <ImCross size="40px" /> </button>
        </div>
    </div>


    </div>
  )
}

export default Report