
import collections
from pymongo.collection import Collection

import random


def generateProductID():
    char:str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    num:str = 123456789

    
    return "".join(random.choices(char,k=3)) + str(random.randint(100,9999)) 
 

def adminCreateProduct(collection:Collection,request):
    SchemeData = {
            "productId": f'PROD-{generateProductID()}',
            "name": request.productName,
            "description": request.description,
            "type": request.typeProd,
            "price": request.discountPrice,
            "originalPrice": request.orignalPrice,
            "rating": 0,
            "remainingQuantity": request.remainingQuantity,
            "totalSold": 0,
            "inStock": True,
            "images": [request.images[0]],
            "categories": [
                request.category
            ],
            "brand": request.brand,
            "weight": request.weight,
            "features": [
                "Greenhouse-friendly blend",
                "Controlled environment support",
                "Tailored for Indian greenhouse crops",
                "Promotes controlled growth"
            ]
    }
    
    
    create = collection.insert_one(SchemeData)    
    
    return create.acknowledged
    


def adminUpdateProduct(collection:Collection,request):

    SchemeData = {}
    
    try:
        if request.productName:
            SchemeData["name"] = request.productName
            
        if request.description:
            SchemeData["description"] = request.description
            
        if request.discountPrice:
            SchemeData["price"] = request.discountPrice

        if request.orignalPrice:
            SchemeData["originalPrice"] = request.orignalPrice
            
        if request.remainingQuantity:
            SchemeData["remainingQuantity"] = request.remainingQuantity
            
        if request.inStock:
            SchemeData["inStock"] = request.inStock 
            
        if request.weight:
            SchemeData["weight"] = request. weight
    except:
        pass

     
     
    print(SchemeData)
    update = collection.update_one(
        {"productId":request.productID},
        {"$set" :SchemeData}
    )
    print(update)

    return update.acknowledged



def adminDeleteProduct(collection:Collection,request):
    return (collection.delete_one({"productId":request.productID})).acknowledged


