import React, { useState }  from 'react';
import { Article } from '../../components';
import { locationImage, hotelImage, flightImage, rentalImage, attractionImage } from './imports';
import './report.css';
import data from './example_recs.json';

var reportdata = data
window.recs = JSON.stringify(window.recs)
//console.log(window.recs)
const dataset = reportdata["recs"][0]
const uploaddata = () => {
    reportdata = window.recs
    console.log(reportdata)
    console.log(reportdata['recs'][0]["attraction"][0]['name'])
    //window.location.reload(false);
}

const Report = () => {

    const [value, setValue] = useState();

    const refresh = ()=>{
        // re-renders the component
        setValue({});
    }

    //const dataset = reportdata['recs'][0]
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
            articleTitle={reportdata['recs'][0]["attraction"][0]['name']}
            articleInfo={reportdata['recs'][0]["attraction"][0]['vicinity']}
            articleTitle1={reportdata['recs'][0]["attraction"][1]['name']}
            articleInfo1={reportdata['recs'][0]["attraction"][1]['vicinity']}
            articleTitle2={reportdata['recs'][0]["attraction"][2]['name']}
            articleInfo2={reportdata['recs'][0]["attraction"][2]['vicinity']}
            />
          </div>
          <div className="collatz__report-container_2">
              <Article imgUrl={dataset["hotel"]["thumbnailUrl"]}
              title="Hotels"
              articleTitle ={dataset["hotel"]["name"]}
              articleInfo = {'Total cost:' + dataset["total_cost"]}
              articleInfo2 = {"starRating:" + dataset["hotel"]["starRating"]}
              />
              <Article imgUrl={attractionImage}
              title="Restaurant"
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
              articleInfo={'lowest Total Fare:'+ dataset["flight"]['lowestTotalFare']}
              />
              <Article imgUrl={dataset["rental"]['partner']['logo']}
              title="Rentals"
              articleTitle={dataset["rental"]['partner']['name']}
              articleInfo={dataset["rental"]["pickup"]["location"]}
              />
          </div>
            <button onClick={uploaddata}>Update</button>
        </div>
    </div>
  )
}

export default Report