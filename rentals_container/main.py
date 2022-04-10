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

app = FastAPI()

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
    doc_ref = db.collection('rentals').document(user_id)

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

    key = "INSERT RAPIDAPI KEY HERE..."

    url = "https://priceline-com-provider.p.rapidapi.com/v2/cars/resultsRequest"

    querystring = {"pickup_date":start_date,"dropoff_date":end_date,"dropoff_time":"10:00","pickup_time":"10:00","pickup_airport_code":dest_airport_code,"currency":"USD"}

    headers = {
        'x-rapidapi-host': "priceline-com-provider.p.rapidapi.com",
        'x-rapidapi-key': key
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    rentals = json.loads(response.text)

    doc_ref.set(rentals["getCarResultsRequest"]["results"]["results_list"])

    return rentals

@app.get("/users/rentals/{user_id}")
def read_rentals(user_id: str, starting_loc, destination, start_date, end_date, adult_count, child_count):
    a_count = int(adult_count)
    c_count = int(child_count)
    rentals = get_data(user_id, starting_loc, destination, start_date, end_date, a_count, c_count)
    return rentals