
from datetime import datetime,timedelta
from pymongo.collection import Collection
import json


from pymongo import MongoClient



# client = MongoClient("mongodb://localhost:27017")
# db = client["agrihelp"]
# collection = db["shop"]


def getTime():
    current_time = datetime.now()
    formatted_time = current_time.strftime("%d %B %Y, %I:%M %p")
    return formatted_time
 

def prototypeTime(hour):   
    current_time = datetime.now()

    # Add 2 hours to the current time (you can change this value as needed)
    current_time_with_added_hours = current_time + timedelta(hours=hour)

    # Format the time in the desired format
    formatted_time = current_time_with_added_hours.strftime("%d %B %Y, %I:%M %p")

    return formatted_time

def trackOrder(collection:Collection,orderID:str):
    
    pass
