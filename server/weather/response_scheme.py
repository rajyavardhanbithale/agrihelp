import datetime
from datetime import datetime
import pytz
import json
from weather import rain_prediction

def toCelcius(temp: float | int) -> int:
    return int(round(temp - 273.15, 1))


def returnToday(responseWeatherAPI: dict, responseOpenWeatherAPI: dict):
    scheme = {
        "location": {
            "name": responseWeatherAPI["location"]["name"],
            "region": responseWeatherAPI["location"]["region"],
            "country": responseWeatherAPI["location"]["country"],
            "country_code": responseOpenWeatherAPI["sys"]["country"],

        },
        "current": {
            "last_updated_epoch": responseOpenWeatherAPI["dt"],
            # "last_update": responseWeatherAPI["current"]["last_updated"],
            "last_update_formatted": datetime.utcfromtimestamp(responseOpenWeatherAPI["dt"]).strftime("%A %dth %B"),

            "main": {
                "temp": toCelcius(responseOpenWeatherAPI["main"]["temp"]),
                "feels_like": toCelcius(responseOpenWeatherAPI["main"]["feels_like"]),
                "temp_min": toCelcius(responseOpenWeatherAPI["main"]["temp_min"]),
                "temp_max": toCelcius(responseOpenWeatherAPI["main"]["temp_max"]),
            },


            "day_night": "night" if responseWeatherAPI["current"]["is_day"] == 0 else "day",
            "condition": {
                "type1": responseWeatherAPI["current"]["condition"]["text"],
                "type2": {
                    "main": responseOpenWeatherAPI["weather"][0]["main"],
                    "description": responseOpenWeatherAPI["weather"][0]["description"]
                },
                "icon": "https" + responseWeatherAPI["current"]["condition"]["icon"].replace("//", "://"),
                "icon_code": responseOpenWeatherAPI['weather'][0]['icon']
            },
            "wind": {
                "kmph": responseWeatherAPI["current"]["wind_kph"],
                "mph": responseWeatherAPI["current"]["wind_mph"],
                "direction": responseWeatherAPI["current"]["wind_dir"]
            },
            "precipitation": {
                "in_mm": responseWeatherAPI["current"]["precip_mm"],
                "in_in": responseWeatherAPI["current"]["precip_in"],
            },
            "astro": {
                "sunrise":  responseWeatherAPI["forecast"]["forecastday"][0]["astro"]["sunrise"],
                "sunset": responseWeatherAPI["forecast"]["forecastday"][0]["astro"]["sunset"],
            },
            "humidity": responseOpenWeatherAPI["main"]["humidity"],
            "cloud": responseWeatherAPI["current"]["cloud"],
            "rain": responseWeatherAPI["forecast"]["forecastday"][0]["day"]["daily_chance_of_rain"],

        }

    }
    return scheme


def returnForecast(responseWeatherAPI: dict, responseOpenWeatherAPI: dict):
    return_lst = []
    rain_list = []
    
  
    for x in responseWeatherAPI["forecast"]["forecastday"]:
        rain_list.append(x["day"]["daily_chance_of_rain"])
        
    rain_list.append(responseWeatherAPI["forecast"]["forecastday"][2]["day"]["totalprecip_mm"])
    get_rain = rain_prediction.rainProbability(rain_list)
    rain_list.pop(3)
    rain = rain_list + get_rain

    cnt = 0
    for x in responseOpenWeatherAPI["list"]:
        
        timestamp = datetime.utcfromtimestamp(x["dt"]).strftime("%I:%M:%S %p")
        if (timestamp == "06:00:00 PM"):
            scheme = {
                "location": {
                    "name": responseOpenWeatherAPI["city"]["name"],
                    "region": responseOpenWeatherAPI["city"]["country"],
                   
                },
                "info": {
                    "time_epoch": x["dt"],
                    "time_formatted": datetime.utcfromtimestamp(x["dt"]).strftime("%A %dth %B"),
                    "time_part":{
                      "date" : datetime.utcfromtimestamp(x["dt"]).strftime("%d"),   
                      "day" : datetime.utcfromtimestamp(x["dt"]).strftime("%A"),   
                      "month" : datetime.utcfromtimestamp(x["dt"]).strftime("%B"),   
                    },
                    "main":{
                        "temp" : toCelcius(x["main"]["temp"]),
                        "temp_min" : toCelcius(x["main"]["temp_min"]),
                        "temp_max" : toCelcius(x["main"]["temp_max"]),
                    },

                    "condition": {
                        "type": x["weather"][0]["main"],
                        "description": x["weather"][0]["description"],
                        "icon": x["weather"][0]["icon"],
                    },
                    "wind": {
                        "mph": x["wind"]["speed"],
                    },
                   
                    
                    "clouds": x["clouds"]["all"],
                    "rain": rain[cnt],

                }

            }
            cnt = cnt +1 
            return_lst.append(scheme)
    return return_lst


def todayForecast(responseWeatherAPI: str):

    return_lst = []
    for x in responseWeatherAPI["forecast"]["forecastday"][0]["hour"]:
        # print(datetime.utcfromtimestamp(x["time_epoch"]).strftime("%A %dth %B %I:%M %p"))
        scheme = {
            "location": {
                "name": responseWeatherAPI["location"]["name"],
                "region": responseWeatherAPI["location"]["region"],
                "country": responseWeatherAPI["location"]["country"]
            },
            "info": {
                "time": x["time"],
                "time_epoch": x["time_epoch"],
                "time_formatted": datetime.utcfromtimestamp(x["time_epoch"]).replace(tzinfo=pytz.utc).astimezone(pytz.timezone('Asia/Kolkata')).strftime("%I %p"),
                "temp": x["temp_c"],

                "condition": {
                    "type": x["condition"]["text"],
                    "icon": "https" + x["condition"]["icon"].replace("//", "://").replace("64x64", "128x128"),
                    "code": x["condition"]["code"]
                },
                "wind": {
                    "kmph": x["wind_kph"],
                    "mph": x["wind_mph"],
                },
                "precipitation": {
                    "in_mm": x["precip_mm"],
                    "in_in": x["precip_in"],
                },
                "humidity": x["humidity"],
                "rain": x["chance_of_rain"],

            }
        }
        
        return_lst.append(scheme)

    return return_lst

# todayForecast("1")


# print(returnForecast("", ""))
