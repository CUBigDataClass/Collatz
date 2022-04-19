get_ipython().system('pip install -U airportsdata')
get_ipython().system('pip install geopy')

import requests,json
from flask import Flask,request, jsonify
from static.constants import *
import airportsdata
import pandas as pd
import numpy as np
import math
from geopy.geocoders import Nominatim

app = Flask(__name__)

@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'
  
# Pure data
airports = airportsdata.load()

# Processed Data
airports_df = pd.DataFrame(columns=["code", "lat", "long"])

for key in airports.keys():
    if ("international" in airports[key]["name"].lower()) or ("intl" in airports[key]["name"].lower()):
        if airports[key]["iata"] is not "":
            # print(airports[key])
            temp_df = pd.DataFrame([[airports[key]["iata"], airports[key]["lat"], airports[key]["lon"]]],
                                   columns=["code", "lat", "long"])
            airports_df = airports_df.append(temp_df, ignore_index=True)

starting_loc = "Boulder"
destination = "San Francisco"
start_date = "2022-06-10"
end_date = "2022-06-17"
adult_count = 1
child_count = 0

def getBestAirports(location, airports_df, nbest=3):
    geocoder = Nominatim(user_agent="GetLoc")
    getLocation = geocoder.geocode(location)

    lat = getLocation.latitude
    long = getLocation.longitude

    location = geocoder.reverse((lat, long))

    # print(location.raw["latitude"])

    city = location.raw["address"]["city"]
    if "state" in location.raw["address"].keys():
        state = location.raw["address"]["state"]
    elif "region" in location.raw["address"].keys():
        state = location.raw["address"]["region"]

    df = airports_df.copy()

    df["dist"] = np.sqrt((airports_df["lat"] - lat) ** 2 + (airports_df["long"] - long) ** 2)
    best_airports = df.nsmallest(nbest, columns=["dist"])
    best_airports.reset_index(inplace=True)

    return best_airports, city, state


@app.route('/hotels')
def hotel_location():
    querystring = {"search_type": "HOTEL", "name": f"{dest_city}, {dest_state}"}

    response = requests.request("GET", hotel_names_url, headers=headers, params=querystring)

#     return response.text


    dictionary = json.loads(response.text)
    details = []
    city_id = dictionary[0]["cityID"]
    a={}
    a['CITY_ID'] = city_id

    details.append(a)
    return jsonify(details)


# start flask app
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
