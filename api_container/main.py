from datetime import datetime
import requests
import pandas as pd
import json
import sys
from geopy.geocoders import Nominatim
from google.cloud import firestore
from fastapi import FastAPI
from typing import Optional
import os
import airportsdata
import numpy as np
import math
import threading
import time
import random

from more_itertools import sort_together
from google.cloud import firestore
from fastapi import FastAPI

rapid_api_key = "774b07103bmsh7f4b47f00895eafp1ff206jsn58ad64733028"
google_api_key = "AIzaSyBhWXbqyQM2rZ3WBKcPqIfJF9W04JITeQo"


app = FastAPI()

@app.get("/users/recs/{user_id}")
async def read_hotels(user_id: str, starting_loc, destination, start_date, end_date, adult_count, child_count):
    a_count = int(adult_count)
    c_count = int(child_count)
    recs = process_all(user_id, starting_loc, destination, start_date, end_date, a_count, c_count)
    return recs

@app.get("/users/places/{user_id}")
async def read_places(user_id: str, starting_loc, destination, start_date, end_date, adult_count, child_count):
    key=google_api_key

    db = firestore.Client(project='festive-shield-346321')

    doc_ref = db.collection('restaurant').document(user_id)
    restaurants = getplaces(location=destination, api_key=key, type_of="restaurant", radius=50000)
    doc_ref.set(restaurants)

    doc_ref = db.collection('attractions').document(user_id)
    attractions = getplaces(location=destination, api_key=key, type_of="tourist_attraction", radius=50000)
    doc_ref.set(attractions)    
    return "FINISHED"

@app.get("/users/flights/{user_id}")
def read_flights(user_id: str, starting_loc, destination, start_date, end_date, adult_count, child_count):
    a_count = int(adult_count)
    c_count = int(child_count)
    flights = get_flights(user_id, starting_loc, destination, start_date, end_date, a_count, c_count)
    return "FINISHED"

@app.get("/users/hotels/{user_id}")
async def read_hotels(user_id: str, starting_loc, destination, start_date, end_date, adult_count, child_count):
    a_count = int(adult_count)
    c_count = int(child_count)
    hotels = get_hotels(user_id, starting_loc, destination, start_date, end_date, a_count, c_count)
    return "FINISHED"

@app.get("/users/rentals/{user_id}")
def read_rentals(user_id: str, starting_loc, destination, start_date, end_date, adult_count, child_count):
    a_count = int(adult_count)
    c_count = int(child_count)
    rentals = get_rentals(user_id, starting_loc, destination, start_date, end_date, a_count, c_count)
    return "FINISHED"

@app.get("/users/save/{user_id}")
async def save_to_profile(user_id: str, starting_loc, destination, start_date, end_date, adult_count, child_count, rec_num):

    # print("WORKING")

    db = firestore.Client(project='festive-shield-346321')
    profile_ref = db.collection(u'profiles').document(user_id)
    profile_data = profile_ref.get().to_dict()

    # print(profile_data)

    recs_ref = db.collection(u'recs').document(user_id)
    recs_data = recs_ref.get().to_dict()

    # print(recs_data)
    
    cur_rec = recs_data["recs"][int(rec_num)]


    if profile_data is None:
        profile_ref.set({"0": {"starting_loc":starting_loc, "destination":destination, "start_date":start_date,
                        "end_date":end_date, "adult_count":adult_count, "child_count":child_count, "rec":cur_rec}})
    else:
        keys = [int(x) for x in list(profile_data.keys())]
        print(keys)
        max_key = max(keys)

        profile_data[str(max_key+1)] = {"starting_loc":starting_loc, "destination":destination, "start_date":start_date,
                        "end_date":end_date, "adult_count":adult_count, "child_count":child_count, "rec":cur_rec}

        profile_ref.set(profile_data)        

    return "FINISHED"

@app.get("/users/profiles/{user_id}")
async def read_from_profile(user_id: str):
    print("WORKING")

    db = firestore.Client(project='festive-shield-346321')
    profile_ref = db.collection(u'profiles').document(user_id)
    profile_data = profile_ref.get().to_dict()

    print(profile_data)

    return profile_data

@app.get("/users/end/{user_id}")
async def end_session(user_id):

    db = firestore.Client(project='festive-shield-346321')

    db.collection('restaurant').document(user_id).delete()
    db.collection('attractions').document(user_id).delete()
    db.collection('hotels').document(user_id).delete()
    db.collection('flights').document(user_id).delete()
    db.collection('rentals').document(user_id).delete()
    db.collection('recs').document(user_id).delete()

    return "FINISHED"

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

def get_flights(user_id, starting_loc, destination, start_date, end_date, adult_count=1, child_count=0):

    db = firestore.Client(project='festive-shield-346321')
    doc_ref = db.collection('flights').document(user_id)

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

    key = rapid_api_key

    url = "https://priceline-com-provider.p.rapidapi.com/v2/flight/roundTrip"

    # UNCOMMENT FOR A WORKING EXAMPLE
    # home_airport_code = "DEN"
    # dest_airport_code = "JFK"

    #print(dest_airport_code)

    querystring = {"departure_date":f"{start_date},{end_date}","adults":f"{adult_count}","sid":"iSiX639","origin_airport_code":f"{home_airport_code},{dest_airport_code}","destination_airport_code":f"{dest_airport_code},{home_airport_code}"}

    headers = {
        'x-rapidapi-host': "priceline-com-provider.p.rapidapi.com",
        'x-rapidapi-key': key
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    response = json.loads(response.text)

    for key in response["getAirFlightRoundTrip"]["results"]["air_search_rsp"]["priced_itinerary"].keys():
        if "marriage_group" in response["getAirFlightRoundTrip"]["results"]["air_search_rsp"]["priced_itinerary"][key].keys():
            del response["getAirFlightRoundTrip"]["results"]["air_search_rsp"]["priced_itinerary"][key]["marriage_group"]


    keys = response["getAirFlightRoundTrip"]["results"].keys()

    # print("SDKLhg:LHKG:")

    print(response["getAirFlightRoundTrip"]["results"]["air_search_rsp"].keys())

    for i in list(response["getAirFlightRoundTrip"]["results"]):
        if i != "air_search_rsp":
            response["getAirFlightRoundTrip"]["results"].pop(i)


    #[response["getAirFlightRoundTrip"]["results"].pop(key) for key in list(keys) if key != "air_search_rsp"]

    # with open("drive/MyDrive/hotels.json", "w") as file:
    # 	json.dump(hotels_for_city, file)

    #print(city_id)


    #name = os.environ.get("NAME", "World")

    doc_ref.set({"summary": response["getAirFlightRoundTrip"]["results"]["air_search_rsp"]["total_trip_summary"],
                "airline": response["getAirFlightRoundTrip"]["results"]["air_search_rsp"]["airline"]})

    return response

def get_hotels(user_id, starting_loc, destination, start_date, end_date, adult_count=1, child_count=0):

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

    key = rapid_api_key

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

def getplaces(location, api_key, type_of="restaurant", radius=50000):

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

  return response

def process_all(user_id, starting_loc, destination, start_date, end_date, adult_count, child_count):
    
    db = firestore.Client(project='festive-shield-346321')
    doc_ref = db.collection('recs').document(user_id)    

    hotel_data = None
    rental_data = None
    flight_data = None
    restaurant_data = None
    attraction_data = None


    start = time.time()

    count = 0
    while (hotel_data is None) and (count < 20):
        hotel_ref = db.collection(u'hotels').document(user_id)
        hotel_data = hotel_ref.get().to_dict()
        count += 1
        if hotel_data is None:
            time.sleep(1)

    count = 0
    while (rental_data is None) and (count < 10):
        rental_ref = db.collection(u'rentals').document(user_id)
        rental_data = rental_ref.get().to_dict()
        count += 1
        if rental_data is None:
            time.sleep(.5)

    count = 0
    while (flight_data is None) and (count < 10):
        flight_ref = db.collection(u'flights').document(user_id)
        flight_data = flight_ref.get().to_dict()
        count += 1
        if flight_data is None:
            time.sleep(.5)

    count = 0
    while (restaurant_data is None) and (count < 10):
        restaurant_ref = db.collection(u'restaurant').document(user_id)
        restaurant_data = restaurant_ref.get().to_dict()
        count += 1
        if restaurant_data is None:
            time.sleep(.25)

    count = 0
    while (attraction_data is None) and (count < 10):
        attraction_ref = db.collection(u'attractions').document(user_id)
        attraction_data = attraction_ref.get().to_dict()
        count += 1
        if attraction_data is None:
            time.sleep(.25)

    #print(type(hotel_data))
    #print(hotel_data.keys())

    end = time.time()

    #print(end-start)

    # LIST OF ALL RELEVANT HOTELS
    all_hotels = []
    #

    for num in range(len(hotel_data["hotels"])):
        hotel = hotel_data["hotels"][num]
        all_hotels.append(hotel)   

    airlines = flight_data["summary"]["carrier"]
    airline_keys = {}
    carriers = flight_data["airline"]
    for carrier in carriers:
        airline_keys[carrier["code"]] = {"name": carrier["name"], "logo": carrier["logo"]}
        
    # LIST OF ALL RELEVANT FLIGHT OPTIONS
    all_flights = []
    #

    for i in range(len(airlines)):
        airline = airlines[i]["airport"][0]["stops"]
        carrier = airline_keys[airlines[i]["code"]]["name"]
        logo = airline_keys[airlines[i]["code"]]["logo"]
        for flight in airline:
            flight["carrier"] = carrier
            flight["logo"] = logo
            all_flights.append(flight)


    rental_dict = rental_data

    # LIST OF ALL RELEVANT CAR RENTAL OPTIONS
    all_rentals = []
    #

    #print(len(rental_dict))

    for car_num in range(len(rental_dict)):  
        rental = rental_dict[f"result_{car_num}"]
        all_rentals.append(rental)

    start_d = datetime.strptime(start_date, "%Y-%m-%d")
    end_d = datetime.strptime(end_date, "%Y-%m-%d")

    # BASIC RANKING ALGORITHM THAT ORDERS 
    # OPTIONS BY TOTAL PRICE (EXCLUDING FOOD/FUEL)

    min_cost = 100000000000

    costs = []
    options = []

    start = time.time()

    for flight_num in range(len(all_flights)):
        for rental_num in range(len(all_rentals)):
            for hotel_num in range(len(all_hotels)):
                flight_cost = float(all_flights[flight_num]["lowestTotalFare"])
                hotel_cost = float(all_hotels[hotel_num]["ratesSummary"]["minPrice"]) * (end_d - start_d).days
                rental_cost = float(all_rentals[0]["price_details"]["base"]["total_price"])
                cur_flight = all_flights[flight_num]

                cost = flight_cost + hotel_cost + rental_cost
                option = {"hotel": all_hotels[hotel_num], "flight": cur_flight, 
                            "rental": all_rentals[rental_num], "total_cost": cost,
                              "restaurant": [restaurant_data["results"][i] for i in random.sample(range(20), k=3)],
                              "attraction": [restaurant_data["results"][i] for i in random.sample(range(20), k=3)]}
                if flight_num == 0:
                    print(cur_flight)
                costs.append(cost)
                options.append(option)

    sorted_options = sort_together([costs, options])[1]

    options_dict = {"recs": options[:80]}

    doc_ref.set(options_dict)

    end = time.time()

    print(end - start)

    return options_dict

def get_rentals(user_id, starting_loc, destination, start_date, end_date, adult_count=1, child_count=0):

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

    key = rapid_api_key

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



