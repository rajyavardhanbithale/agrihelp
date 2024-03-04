
# *** In Development ***  
import time
from dotenv import load_dotenv
import pymongo
from redis.client import Redis
from pymongo.collection import Collection
import pymongo
import json
import redis
from bson import json_util
import os

load_dotenv()

mongo_client = pymongo.MongoClient(f"mongodb+srv://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}@{os.getenv('MONGO_CLUSTER')}/?retryWrites=true&w=majority")
mongo_db = mongo_client["agrihelp"]
mongo_collection = mongo_db["shop"]

redis_client =  redis.StrictRedis(
  host=os.getenv('REDIS_HOST'),
  port=os.getenv('REDIS_PORT'),
  password=os.getenv('REDIS_PASSWORD'))


def setRedisShopItem(redis:Redis,mongo:Collection,database:str,category:str,item:int):
    # Check if data exist
    getData = redis.get(database+category)
    if getData is not None:
       return True
        
    # Add Data to Redis
    else:
        random_records = list(mongo.aggregate([
            {"$match": {"categories": category}},
            {"$sample": {"size": item}}
        ]))
        
        serialized_data = json.dumps(random_records, default=json_util.default)
        redis.set(database+category,json.dumps(serialized_data))
    
    
def getRedisShopItem(redis:Redis,database:str,category:str):
    #  Check if Data Exist
    getData = redis.get(database+category)
    if getData:
       return json.loads(getData.decode('utf-8'))
    
    # If Data not found return false
    else:
       return False

# get = getRedisShopItem(redis=redis_client,database="shop",category="seeds")

# if get:
#     print(get)

# else:
#     setRedisShopItem(redis=redis_client,mongo=mongo_collection,category="seeds",database="shop",item=95)    


def benchmark():
    READ = 500
    su = 0
    for p in range (0,READ):
        x = time.time()
        random_records = list(mongo_collection.aggregate([
                    {"$match": {"categories": "seeds"}},
                    {"$sample": {"size": 95}}
                ]))
        y = time.time()
        su = (y-x) + su
        print(f"Mongo DB {p}: {y-x:.3f}")
        
    mo = su/READ
    print(f"\nMongo AVG : ",mo)    

    su = 0
    print("\n\n------------------------------")
    for p in range(0,READ):
        x = time.time()
        redis_client.json().get("shop",'$')
        y = time.time()
        su = (y-x) + su
        print(f"Redis {p}: {y-x:.3f}")

    print(f"\nRedis AVG : ",su/READ)   



    print("\n\n-+++++++++++++++++++++++++++++")
    print(f"\nMongo AVG : ",mo)    
    print(f"\nRedis AVG : ",su/READ)