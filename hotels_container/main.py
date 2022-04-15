import os
import requests
import json
import airportsdata
import pandas as pd
import numpy as np
import math
from geopy.geocoders import Nominatim
from flask import Flask
from google.cloud import firestore
from fastapi import FastAPI
from typing import Optional

# from google.auth import compute_engine
# credentials = compute_engine.Credentials()

app = FastAPI()

@app.get("/users/hotels/{user_id}")
async def read_hotels(user_id: str, starting_loc, destination, start_date, end_date, adult_count, child_count):
    a_count = int(adult_count)
    c_count = int(child_count)
    hotels = get_data(user_id, starting_loc, destination, start_date, end_date, a_count, c_count)
    return hotels

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

    df["dist"] = np.sqrt((airports_df["lat"].astype('float') - lat)**2 + (airports_df["long"].astype('float') - long)**2)
    best_airports = df.nsmallest(nbest, columns=["dist"])
    best_airports.reset_index(inplace=True)

    return best_airports, city, state

def get_data(user_id, starting_loc, destination, start_date, end_date, adult_count=1, child_count=0):

    db = firestore.Client(project='festive-shield-346321')
    doc_ref = db.collection('hotels').document(user_id)

    # Pure data
    airports = airportsdata.load()

    # Processed Data
    airports_df = pd.DataFrame(columns=["code", "lat", "long"])

    for key in airports.keys():
        if ("international" in airports[key]["name"].lower()) or ("intl" in airports[key]["name"].lower()):
            if airports[key]["iata"] != "":
                # print(airports[key])
                temp_df = pd.DataFrame([[airports[key]["iata"], airports[key]["lat"], airports[key]["lon"]]], columns=["code", "lat", "long"])
                airports_df = pd.concat([airports_df, temp_df], ignore_index=True)

    # starting_loc=input("Where are you leaving from? ")
    # destination=input("Where would you like to visit? ")
    # start_date=input("When will you be leaving? (YYYY-MM-DD) ")
    # end_date=input("When will you be coming back? (YYYY-MM-DD) ")
    # adult_count=int(input("How many adults will be coming on this trip? "))
    # child_count=int(input("How many children will be coming on this trip? "))

    # starting_loc="Boulder"
    # destination="San Francisco"
    # start_date="2022-06-10"
    # end_date="2022-06-17"
    # adult_count=1
    # child_count=0

    home_best_airports, home_city, home_state = getBestAirports(starting_loc, airports_df)
    dest_best_airports, dest_city, dest_state = getBestAirports(destination, airports_df)
    #print(location.raw["address"]["country_code"].upper())

    home_airport_code = home_best_airports.loc[0]["code"]
    dest_airport_code = dest_best_airports.loc[0]["code"]

    key = ""

    url = "https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations"

    querystring = {"search_type":"HOTEL","name":f"{dest_city}, {dest_state}"}

    headers = {
        'x-rapidapi-host': "priceline-com-provider.p.rapidapi.com",
        'x-rapidapi-key': key
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    dictionary = json.loads(response.text)
    city_id = dictionary[0]["cityID"]

    location_id = city_id
    checkin = start_date
    checkout = end_date
    num_rooms = str(math.ceil(adult_count/2))

    url = "https://priceline-com-provider.p.rapidapi.com/v1/hotels/search"

    querystring = {"date_checkin":checkin,"location_id":location_id,"date_checkout":checkout,"sort_order":"PRICE","amenities_ids":"FINTRNT,FBRKFST","rooms_number":num_rooms,"star_rating_ids":"3.0,3.5,4.0,4.5,5.0"}

    headers = {
        'x-rapidapi-host': "priceline-com-provider.p.rapidapi.com",
        'x-rapidapi-key': key
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    hotels_for_city = json.loads(response.text)

    # with open("drive/MyDrive/hotels.json", "w") as file:
    # 	json.dump(hotels_for_city, file)

    #print(city_id)


    #name = os.environ.get("NAME", "World")

    doc_ref.set(hotels_for_city)

    return hotels_for_city

# if __name__ == "__main__":
#     app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8090)))

# get_data()