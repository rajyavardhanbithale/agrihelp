from typing import List, Union
from pydantic import BaseModel
import time
from shop import order_tracking

class UserSignup(BaseModel):
    firstname: str
    lastname: str
    username: str
    email:str
    password: str
    confirm_password: str = None
    phone_number: str = None
    ip_origin: str = None
    originF:str = None
    image:str = None
    billingAddress:str = None   
    
class UserLogin(BaseModel):
    username:str = None
    email:str = None
    password:str
    verbose:bool = None
    
class UserForgotPassword(BaseModel):
    username:str = None
    email:str = None
    password:str
    verbose:bool = None
    
class UserForgotPasswordGenerate(BaseModel):
    username:str = None
    email:str = None
    password:str

class UserVerified(BaseModel):
    email:str
    password:str
    
class UserDelete(BaseModel):
    email:str
    password:str
    
class GetUser(BaseModel):
    username:str = None
    email:str = None
    password:str
    validationKey:str
    


    
class PlaceOrder(BaseModel):
    orderID:str = None
    fullname:str
    email:str
    orderCart: list
    cardHolderName: str
    billingAddress: str
    orderPlacedTimeEPOCH:float = time.time()
    orderPlacedTime:str =  order_tracking.getTime()
    state: str
    zip:str
    deliveryMethod: str
    
    trackingStatus: dict = {
        "orderID": "",
        "orderStatus": [
            {
                "title": "Order Placed",
                "date": order_tracking.getTime(),
                "status": "green",
                "description": "Your order has been successfully placed. We are preparing your items for shipment.",
                "icon": "check",
            },
            {
                "title": "Processing",
                "date": f"Expected: {order_tracking.prototypeTime(13.6)}",
                "status": "gray",
                "description": "We are currently processing your order and getting it ready for shipment.",
                "icon": "",
            },
            {
                "title": "Delivery",
                "date": f"Expected: {order_tracking.prototypeTime(36.6)}",
                "status": "gray",
                "description": "",
                "icon": "",
            },
        ]
    }
    
class Progress(BaseModel):
    email:str
    name:str
    stage:bool 
    stageIndex:int 
    

class ShopAdminCreate(BaseModel):
    time:float = None
    productID:str = None
    method:str = None
    productName:str = None
    description:str = None 
    typeProd:str = None
    discountPrice:float = None
    orignalPrice:float = None
    remainingQuantity:int = None
    totalSold:int = None
    inStock:bool = None 
    images:Union[List[str], List[str]] = None
    category:str = None 
    brand:str  = None
    weight:float  = None
    

class ShopAdminUpdate(BaseModel):
    method:str
    name:str = None
    description:str = None
    orignalPrice:str = None
    remainingQuantity:str = None
    inStock:str = None
    weight:str = None
    

def DatabaseScheme(**kwargs):
    firstname = kwargs.get("username",None)
    lastname = kwargs.get("lastname",None)
    username = kwargs.get("username",None)
    email = kwargs.get("email",None)
    password = kwargs.get("password",None)
    old_password = kwargs.get("old_password",None)
    phone_number = kwargs.get("phone_number",None)
    ip = kwargs.get("ip",None)
    verification_id = kwargs.get("verification_id",None)
    address = kwargs.get("billingAddress",None)
    
    
    otp = kwargs.get("otp",None)
    url:bool = kwargs.get("url_verification",False)
    exp_time = kwargs.get("exp_time",None)
    
    origin = kwargs.get("origin","host")
    
    timestamp = time.time()
    
    DbSchemeOTP = {
        "firstname": firstname,
        "lastname": lastname,
        "username": username,
        "email": email,
        "password": password,
        "oldPassword": old_password,
        "phoneNumber": phone_number,
        "ip": {
      		"ip_signup":{
            	"timestamp": timestamp,
            	"ip":ip
             },
			"ip_login": {
				"timestamp": [],
				"ip":[]
       		},
   			"ip_update": {
				"timestamp":[],
				"ip":[]
			}
   		},
        "is_verified" : "false",
		"otp_verification":{
			"otp": otp,
			"expiration_time" : exp_time
		},
        "forgot_password_id":None,

        "billingAddress":address,
        "orders": [],
        "origin":origin
    }
    
    DbSchemeURL = {
        "firstname": firstname,
        "lastname": lastname,
        "username": username,
        "email": email,
        "password": password,
        "oldPassword": old_password,
        "phoneNumber": phone_number,
        "ip": {
      		"ip_signup":{
            	"timestamp": timestamp,
            	"ip":ip
             },
			"ip_login": {
				"timestamp": [],
				"ip":[]
       		},
   			"ip_update": {
				"timestamp":[],
				"ip":[]
			}
   		},
        "is_verified" : False,
        "forgot_password_id":None,
        "verification_id": verification_id[0:5]+verification_id[-14:-19:-1][::-1] if len(verification_id)!=0 else None,
        "billingAddress":address,
        "orders": [],
        "origin":origin
    }
   
    return DbSchemeURL if url else DbSchemeOTP 
    
    
    
def DatabaseSchemeGoogle(**kwargs):
    firstname = kwargs.get("firstname",None)
    lastname = kwargs.get("lastname",None)
    username = kwargs.get("username",None)
    email = kwargs.get("email",None)
    password = kwargs.get("password",None)
    old_password = kwargs.get("old_password",None)
    phone_number = kwargs.get("phone_number",None)
    ip = kwargs.get("ip",None)
    address = kwargs.get("billingAddress",None)
    
    origin = kwargs.get("origin","host")
    image = kwargs.get("image",None)
    
    timestamp = time.time()
    
    DbSchemeGoogle = {
        "firstname": firstname,
        "lastname": lastname,
        "username": username,
        "email": email,
        "password": password,
        "oldPassword": old_password,
        "phoneNumber": phone_number,
        "ip": {
      		"ip_signup":{
            	"timestamp": timestamp,
            	"ip":ip
             },
			"ip_login": {
				"timestamp": [],
				"ip":[]
       		},
   			"ip_update": {
				"timestamp":[],
				"ip":[]
			}
   		},
        "is_verified" : True,
        "forgot_password_id":None,
        "billingAddress":address,
        "orders": [],
        "image":image,
        "origin":origin,
    }   
    
    return DbSchemeGoogle