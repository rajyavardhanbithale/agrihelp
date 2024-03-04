def find_unique_values(data_list, field_name):
    unique_values = set()

    for item in data_list:
        if field_name in item and isinstance(item[field_name], list) and len(item[field_name]) > 0:
            unique_values.add(item[field_name][0])

    return list(unique_values)


# Example usage:
import json
with open("agrihelp.shop.json","r") as file1:
    json_data = json.load(file1)
    
unique_names = find_unique_values(json_data, "categories")
print(unique_names)


