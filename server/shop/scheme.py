

# scheme = {

#     "productId": "PROD-ABC123",
#     "name": "Premium Organic Seeds",
#     "description": "High-quality seeds for your home garden.",
#     "type": "seed",
#     "price": 39.99,
#     "originalPrice": 59.99,
#     "rating": 4.3,
#     "remainingQuantity": 85,
#     "totalSold": 89,
#     "inStock": True,
#     "images": [
#             "https://example.com/product-images/seed_1.jpg",
#             "https://example.com/product-images/seed_2.jpg"
#     ],
#     "categories": [
#         "seeds",
#         "organic",
#         "vegetables"
#     ],
#     "brand": "Green Thumb",
#     "weight": 20,
#     "features": [
#         "Non-GMO",
#         "Open-pollinated",
#         "High germination rate"
#     ]

# }

from pymongo import MongoClient

# # Connect to MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client["agrihelp"]
collection = db["shop"]

# # Data to be inserted
# data_to_insert ={
#     "productId": "PROD-RICE001",
#     "name": "Premium Rice Seeds - Variety A",
#     "description": "High-quality seeds for cultivating premium rice crops.",
#     "type": "seed",
#     "price": 999.50,
#     "originalPrice": 1699.50,
#     "rating": 4.2,
#     "remainingQuantity": 150,
#     "totalSold": 130,
#     "inStock": True,
#     "images": [
#         "https://example.com/product-images/rice_seed_a_1.jpg",
#         "https://example.com/product-images/rice_seed_a_2.jpg"
#     ],
#     "categories": [
#         "seeds",
#         "grains",
#         "rice"
#     ],
#     "brand": "Harvest Haven",
#     "weight": 5,
#     "features": [
#         "Non-GMO",
#         "High yield",
#         "Ideal for various rice dishes"
#     ]
# }



# # Insert a single document
# result = collection.insert_one(data_to_insert)

# # Print the ID of the inserted document
# print("Inserted document ID:", result.inserted_id)


# total_items = collection.count_documents({})

# print(f'Total items in the collection: {total_items}')


# import json
# with open("shop/item.json","r") as file:
#     js = json.loads(file.read())
    
   
# for item in js:
#     result = collection.insert_one(item)

#     # Print the ID of the inserted document
#     print("Inserted document ID:", result.inserted_id)


