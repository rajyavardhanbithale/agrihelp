from pymongo.collection import Collection
from sympy import false

def check_unique(collection:Collection,username:str=None,email:str=None,verbose:bool=None):
    
    
    if(verbose):
        search = collection.find_one({"username":username,"email":email})
        
        return search if search else False
 
    if(username):
        search = collection.find_one({"username":username})
        if search and search["is_verified"]:
            return True 
        
        return  False
    
    elif(email):
        search = collection.find_one({"email":email})
        if search and search["is_verified"]:
            return True 
        return False

