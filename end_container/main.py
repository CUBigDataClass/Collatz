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
async def save_to_provile(user_id: str):
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