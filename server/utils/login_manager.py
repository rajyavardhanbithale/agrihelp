from pymongo.collection import Collection

def checkData(username:str=None,email:str=None):
    if((username==None and email==None) or username and email):
        return False
    return True


def doLogin(collection:Collection,password:str,username:str=None,email=None,verbose:bool=False):
    if username:
        login = collection.find_one({"username":username,"password":password})
    
    if email:
        login = collection.find_one({"email":email,"password":password})
    
   
    if(login==None or login["is_verified"]==False):
        return "user not found",False
     
    if(login["is_verified"]==True and verbose==True):
        return {"username":login["username"],"email":login["email"],"password":login["password"]}

    if(login["is_verified"]==True):
        return True
    
   
        