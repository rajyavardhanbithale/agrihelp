import pickle
import numpy as np
import ml.crop_info as ci

crop_model = 'ml/models/crop_reccom_model.pkl'
crop_recommendation_model = pickle.load(
    open(crop_model, 'rb'))

def crop_prediction(N:float,P:float,K:float,ph:float,rainfall:float,temperature:float,humidity:float):
    
    if temperature != None or humidity !=None:
        data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
        my_prediction = crop_recommendation_model.predict(data)
        final_prediction = my_prediction[0]

        return getattr(ci,final_prediction,"crop not available")
    
    

