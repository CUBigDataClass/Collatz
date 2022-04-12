import googlemaps
from datetime import datetime
import requests
import pandas as pd
import json
import sys
from geopy.geocoders import Nominatim
from google.cloud import firestore
from fastapi import FastAPI
from typing import Optional

app = FastAPI()

@app.get("/users/places/{user_id}")
async def read_places(user_id: str, starting_loc, destination, start_date, end_date, adult_count, child_count):
    key=""

    db = firestore.Client(project='festive-shield-346321')

    doc_ref = db.collection('restaurant').document(user_id)
    restaurants = getData(location=destination, api_key=key, type_of="restaurant", radius=50000)
    doc_ref.set(restaurants)

    doc_ref = db.collection('attractions').document(user_id)
    attractions = getData(location=destination, api_key=key, type_of="tourist_attraction", radius=50000)
    doc_ref.set(attractions)    
    return "FINISHED"

def getData(location, api_key, type_of="restaurant", radius=50000):

  file_name=f"drive/MyDrive/{type_of}.pkl"

  place=location

  location = Nominatim(user_agent="GetLoc")
  getLocation = location.geocode(place)

  lat = getLocation.latitude
  long = getLocation.longitude

  radius=radius #Distance from coordinates in meters
  type_of=type_of # restaurant, tourist_attraction, lodging, depending on what you're looking for
  key=api_key


  if type_of not in ["lodging", "restaurant", "tourist_attraction", "aquarium", "zoo", "night_club"]:
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat}%2C{long}&radius={radius}&keyword={type_of}&key={key}"
  else:
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat}%2C{long}&radius={radius}&type={type_of}&key={key}"

  payload={}
  headers = {}

  response = requests.request("GET", url, headers=headers, data=payload)

  response = json.loads(response.text)

  # df = pd.DataFrame(columns=["name", "latitude", "longitude", "photo_ref", "price_level", "rating", "rating_count", "vicinity", "types"])

  # for i in range(len(response["results"])):
  #   print(i)
  #   place = response["results"][i]

  #   if "price_level" in place.keys():
  #     level = place["price_level"]
  #   else:
  #     level = None

  #   if "photos" in place.keys():
  #     photo_id = place["photos"][0]["photo_reference"]
  #   else:
  #     photo_id = None

  #   if "rating" in place.keys():
  #     rating = place["rating"]
  #   else:
  #     rating = None

  #   if "user_ratings_total" in place.keys():
  #     count = place["user_ratings_total"]
  #   else:
  #     count = None

  #   if i != 0:
  #     row = pd.Series([place["name"], place["geometry"]["location"]["lat"], 
  #                       place["geometry"]["location"]["lng"],
  #                       photo_id, level, 
  #                       rating, count, place["vicinity"], 
  #                       place["types"]], index=df.columns)
  #     df = df.append(row, ignore_index=True)

  # df.to_pickle(file_name)

  return response
