# #!/usr/bin/python3
import requests
import json
from dotenv import load_dotenv
import os
import datetime
from weather import response_scheme

load_dotenv()


class Weather:
    def __init__(self) -> None:
        self.urlForecast = "http://api.weatherapi.com/v1/forecast.json"
        self.baseUrlWeather = "http://api.openweathermap.org/data/2.5/weather"
        self.urlToday = "http://api.weatherapi.com/v1/current.json"
        self.geo =" http://api.openweathermap.org/geo/1.0/direct"
        self.oneCall = "https://api.openweathermap.org/data/2.5/forecast"
        self.key = os.getenv("WEATHERAPI")
        self.OpenKey = os.getenv("OPENWEATHERAPI")

    
    def weatherToday(self,city:str,lat:float,lon:float):
        # fetch = requests.get("{url}?key={key}&q={city}".format(url=self.urlToday,key=self.key,city=city))
        # parseFetch = fetch.json()
        if (lat!=None and lon!=None):
            fetch1 = requests.get("{url}?appid={key}&lat={lat}&lon={lon}".format(url=self.baseUrlWeather,key=self.OpenKey,lat=lat,lon=lon))
            parseFetch1 = fetch1.json()
            # print("{url}?appid={key}&lat={lat}&lon={lon}".format(url=self.baseUrlWeather,key=self.OpenKey,lat=lat,lon=lon))
            
            fetch2 = requests.get("{url}?key={key}&q={lat},{lon}&days={days}".format(url=self.urlForecast,key=self.key,lat=lat,lon=lon,days=1))
            parseFetch2 = fetch2.json()
            
            print("{url}?key={key}&q={lat},{lon}&days={days}".format(url=self.urlForecast,key=self.key,lat=lat,lon=lon,days=1))
       
        else:
            
            fetch1 = requests.get("{url}?appid={key}&q={city}".format(url=self.baseUrlWeather,key=self.OpenKey,city=city))
            parseFetch1 = fetch1.json()
            
            fetch2 = requests.get("{url}?key={key}&q={city}&days={days}".format(url=self.urlForecast,key=self.key,city=city,days=1))
            parseFetch2 = fetch2.json()
        
  
        ret = response_scheme.returnToday(responseWeatherAPI=parseFetch2,responseOpenWeatherAPI=parseFetch1)
        # print(json.dumps(parseFetch1,indent=4))
        return ret
 
        
    def weatherForecast(self,city:str,days:int,lat:float,lon:float):
       
        
        if (lat!=None and lon!=None):
            fetch1 = requests.get("{url}?lat={lat}&lon={lon}&appid={api}".format(url=self.oneCall,lat=lat,lon=lon,api=self.OpenKey))
            parseFetch1 = fetch1.json()
            
            fetch = requests.get("{url}?key={key}&q={lat},{lon}&days=5".format(url=self.urlForecast,key=self.key,city=city,lat=lat,lon=lon))
            parseFetch = fetch.json()
            
        else:
            fetch = requests.get("{url}?key={key}&q={city}&days=5".format(url=self.urlForecast,key=self.key,city=city))
            parseFetch = fetch.json()
        
            getGeo = requests.get("{url}?q={city}&appid={api}".format(url=self.geo,city=city,api=self.OpenKey))
            geoParse = getGeo.json()  
            lat, lon = geoParse[0]["lat"], geoParse[0]["lon"]
            
            fetch1 = requests.get("{url}?lat={lat}&lon={lon}&appid={api}".format(url=self.oneCall,lat=lat,lon=lon,api=self.OpenKey))
            parseFetch1 = fetch1.json()
        
       
        ret = response_scheme.returnForecast(responseWeatherAPI=parseFetch,responseOpenWeatherAPI=parseFetch1)
        return ret
        # print(json.dumps(ret,indent=4))
        
    
    def todayForecast(self,city:str,lat:float,lon:float):
        if (lat!=None and lon!=None):
            fetch = requests.get("{url}?key={key}&q={lat},{lon}&days=1".format(url=self.urlForecast,key=self.key,city=city,lat=lat,lon=lon))
            parseFetch2 = fetch.json()
        else:
            fetch2 = requests.get("{url}?key={key}&q={city}&days={days}".format(url=self.urlForecast,key=self.key,city=city,days=1))
            parseFetch2 = fetch2.json()
        ret = response_scheme.todayForecast(responseWeatherAPI=parseFetch2)
        return ret
        # return response_scheme.todayForecast(responseWeatherAPI=123)
   
    
# x = Weather()
# print(x.todayForecast("raipur"))
# 
