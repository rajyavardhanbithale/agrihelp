from cryptography.fernet import Fernet
import base64
import time
import json
from pymongo.collection import Collection
from secure import encryptor
from secure import decryptor

def urlUniqueId(url:str):
    # print(url)
    # url = url.split('forgot-password')[1] if len(url)!=0 else ""
    return url[0:5]+url[-14:-19:-1][::-1] if len(url)!=0 else None

def generateVerificationUrl(collection:Collection,username:str,email:str,key:str):
    data = {
        "username": username,
        "email": email,
    }
    encrypted = encryptor.encryptString(key=key,data=json.dumps(data),method="verification")
    
    return encrypted


    

def verifyVerificationUrl(request:str,key:str,method:str):
    get_data = decryptor.decryptString(key=key,data=request,method=method)

    return get_data

def verifyUserUsingUrl(collection:Collection,username:str,email:str,url:str):
    check_if_already_verify = collection.find_one({"username":username,"email":email})
    
    if(check_if_already_verify["is_verified"]):
        return "user already verified"
    
    elif(not check_if_already_verify["is_verified"] and check_if_already_verify["verification_id"]==urlUniqueId(url=url)):
        update_data = {"$set": {"is_verified": True}}
        result = collection.update_one({"username":username}, update_data)
        if result.acknowledged:
            return "user verified"
        
    else:
        return "error during verifying user"
    
    return True

# password = "y]?RvKzFxgeEDDIkKX&"
# key = generate_key(password)
# print(type(key))

