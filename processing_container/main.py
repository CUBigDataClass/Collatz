import datetime
import threading
import pandas as pd
import time
import random

from more_itertools import sort_together
from google.cloud import firestore
from fastapi import FastAPI

app = FastAPI()

@app.get("/users/recs/{user_id}")
async def read_hotels(user_id: str, starting_loc, destination, start_date, end_date, adult_count, child_count):
    a_count = int(adult_count)
    c_count = int(child_count)
    recs = process_data(user_id, starting_loc, destination, start_date, end_date, a_count, c_count)
    return recs

def process_data(user_id, starting_loc, destination, start_date, end_date, adult_count, child_count):
    
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
        airline_keys[carrier["code"]] = carrier["name"]
        airline_keys[carrier["logo"]] = carrier["logo"] 
        

    # LIST OF ALL RELEVANT FLIGHT OPTIONS
    all_flights = []
    #

    for i in range(len(airlines)):
        airline = airlines[i]["airport"][0]["stops"]
        carrier = airline_keys[airlines[i]["code"]]
        logo = airline_keys[airlines[i]["logo"]]
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

    start_d = datetime.datetime.strptime(start_date, "%Y-%m-%d")
    end_d = datetime.datetime.strptime(end_date, "%Y-%m-%d")

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

    # import json
    # with open('example_recs.json', 'a',encoding="utf-8") as file:
    #     json.dump(options_dict, file)

    #print(type(restaurant_data))   
    # print(restaurant_data["results"][0])
    # print(len(restaurant_data["results"]))
    # print("..........")
    # print(attraction_data["results"][0])
    # print(len(attraction_data["results"]))
    # print(restaurant_data["results"])

    return options_dict