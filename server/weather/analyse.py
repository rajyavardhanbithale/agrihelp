import requests
from dotenv import load_dotenv
import os
from weather import response_scheme

load_dotenv()



urlForecast = "http://api.weatherapi.com/v1/forecast.json"
baseUrlWeather = "http://api.openweathermap.org/data/2.5/weather"
urlToday = "http://api.weatherapi.com/v1/current.json"
geo =" http://api.openweathermap.org/geo/1.0/direct"
oneCall = "https://api.openweathermap.org/data/2.5/forecast"
key = os.getenv("WEATHERAPI")
OpenKey = os.getenv("OPENWEATHERAPI")

    
def summ(city:str,):
    fetch = requests.get("{url}?key={key}&q={city}".format(url=urlToday,key=key,city=city))
    parseFetch = fetch.json()
    
    fetch1 = requests.get("{url}?appid={key}&q={city}".format(url=baseUrlWeather,key=OpenKey,city=city))
    parseFetch1 = fetch1.json()
    
    fetch2 = requests.get("{url}?key={key}&q={city}&days={days}".format(url=urlForecast,key=key,city=city,days=1))
    parseFetch2 = fetch2.json()
    

    ret = response_scheme.returnToday(responseWeatherAPI=parseFetch2,responseOpenWeatherAPI=parseFetch1)
    # print(json.dumps(parseFetch1,indent=4))
    
    msg = f"""city = {ret["location"]["name"]}, state = {ret["location"]["name"]}, country={ret["location"]["country"]},temperature in celsius = {ret["current"]["main"]["temp"]} , condition = {ret["current"]["condition"]["type1"]},description = {ret["current"]["condition"]["type2"]["main"]}, wind in kmph = {ret["current"]["wind"]["kmph"]},precipitation in mm = {ret["current"]["precipitation"]["in_mm"]},sunrise = {ret["current"]["astro"]["sunrise"]},sunset = {ret["current"]["astro"]["sunset"]},humidity = {ret["current"]["humidity"]},cloud = {ret["current"]["cloud"]},rain = {ret["current"]["rain"]}"""
    

