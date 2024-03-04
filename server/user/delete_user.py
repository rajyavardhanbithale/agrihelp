from pymongo.collection import Collection


def deleteUser(collection:Collection,collection_delete:Collection,ip:str,email:str,password:str):
    user = collection.find_one({"email":email,"password":password})
    
    if user and user is not None:
        # migration
        data_migrate = {
            "email": email,
            "ip": ip,    # last ip
        }
        collection_delete.insert_one(data_migrate)
        
        delete = collection.delete_one({"_id":user["_id"]})
        if delete.acknowledged:
            return True
        
    return False
        
    