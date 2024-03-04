import random
import time


def generateOTP(size:int):
    digits = '1234567890'
    one_time = int(''.join(random.choices(digits, k=size)))
    if(len(str(one_time))!=size): 
        return int(''.join(random.choices(digits, k=size)))
    
    return one_time


def expirationTime(minutes:int):
    return time.time() + (minutes*60)

