import statistics



def rainProbability(rain):
    if(rain[2]<=5  and rain[3] <=5):
        return [0,0]
    
    elif rain[0] == 0:
        rain[0] = 1
    data = {'Day1': rain[0], 'Day2': rain[1], 'Day3': rain[2], 'Rainfall': rain[3]}
    day_values = [data['Day1'], data['Day2'], data['Day3']]
    mean_value = statistics.mean(day_values)
    std_dev = statistics.stdev(day_values)
    day4_value = (rain[0]+rain[1]+rain[2])/3 - (rain[0]+rain[1]+rain[2])/200 - (rain[0]+rain[1]+rain[2])/100 - (rain[3]/100)
    z_score_day4 = (day4_value - mean_value) / std_dev
    probability_day4 = 1 - statistics.NormalDist().cdf(z_score_day4)
    day5_value = day4_value - (std_dev * z_score_day4)
    z_score_day5 = (day5_value - mean_value) / std_dev
    probability_day5 = 1 - statistics.NormalDist().cdf(z_score_day5)
    return [int(round(probability_day4*100)),int(round(probability_day5*100))]

