from pymongo.collection import Collection
from secure import encryptor
from secure import decryptor
import json
import time


def urlUniqueId(url:str):
    # print(url)
    # url = url.split('forgot-password')[1] if len(url)!=0 else ""
    return url[0:5]+url[-14:-19:-1][::-1] if len(url)!=0 else None

def generateForgotPasswordURL(collection:Collection,host:str,key:str,password:str,username:str=None,email:str=None):
    if email:
        valid_user = collection.find_one({"email":email,"password":password})
       
    if(valid_user==None or valid_user["is_verified"]==False):
        return "user not found"

   
    if(valid_user["password"]==password and (valid_user["email"]==email or valid_user["username"]==username)):
        url_scheme={
            "email":valid_user["email"],
            "password": password
        }
      
        build_url = encryptor.encryptString(key=key,method="forgot",data=json.dumps(url_scheme))
        
        return host + build_url





def updatePassword(collection:Collection,ip:str,url:str,key:str,email:str,password:str):
   
    decrypt_url = decryptor.decryptString(key=key,data=url,method="forgot")
    
    json_scheme = json.loads(decrypt_url)
    find_user = collection.find_one({"email":json_scheme["email"]})
    
    
    if json_scheme["email"]!=email or find_user["is_verified"]==False:
        return "invalid user"
    
    if json_scheme["password"]!=find_user["password"] or find_user["forgot_password_id"]==urlUniqueId(url=url):
        return "url expire"
    
    
    
    print(ip)
    if find_user!=None or find_user!=False:
        query = {
            "$set": {
                "password": password,
                "oldPassword": find_user["password"],
                "forgot_password_id": urlUniqueId(url=url)
            },
        "$push": {
            "ip.ip_update.ip":ip,
            "ip.ip_update.timestamp":time.time()
            }
                 
        }

        update1 = collection.update_one({"_id":find_user['_id']},query)

        
        return True if update1.acknowledged else False
    
    
