import csv
import json

file = 'ner_hotel.csv'
jsonFilePath = 'nerhotel.json'

arr = []
id = 0


def get_main_oligarchs(arr):
	new_arr = []
	for item in arr:
		if item['name'].startswith('!!!'):
			item['name'] = item['name'].replace('!', '').strip()
			new_arr.append(item)
	return new_arr


def clean_oligarchs(arr):
	new_arr = []
	for item in arr:
		if item['name'] != '':
			item['name'] = item['name'].replace('!', '').strip()
			new_arr.append(item)
	return new_arr

with open(file) as csvFile:
	csvReader = csv.DictReader(csvFile)

	for csvRow in csvReader:
		oligarchs = [
			{'name': csvRow['T1 OL'], 'link': csvRow['T1_link']}, 
			{'name': csvRow['T2 OL'], 'link': csvRow['T2_link']}, 
			{'name': csvRow['T3 OL'], 'link': csvRow['T3_link']}
		]
		ceos = [
			{'name': csvRow['IT1'], 'link': csvRow['IT1_link']}, 
			{'name': csvRow['IT2'], 'link': csvRow['IT2_link']}, 
			{'name': csvRow['IT3'], 'link': csvRow['IT3_link']}
		]
		address = ', '.join([csvRow['city'], csvRow['loc_address'], csvRow['zip']])
		data = {
			'type': 'Feature',
			'properties': {
				'id': id,
				'address': address,
				'company': {'name': csvRow['company'].strip(), 'link': csvRow['company_link']},
				'name': csvRow['loc_name'],
				'city': csvRow['city'],
				'type': csvRow['type'],
				'link': csvRow['news'],
				'mainOligarch': get_main_oligarchs(oligarchs),
				'mainCEO': get_main_oligarchs(ceos),
				'oligarchs': clean_oligarchs(oligarchs),
				'ceos': clean_oligarchs(ceos),
				'date': csvRow['date'],
				'details': csvRow['details']
			},
			'geometry': {
				'type': 'Point',
				'coordinates': [float(csvRow['lat1.1']), float(csvRow['lng1.1'])]
			}
		}
		id = id + 1
		arr.append(data)


with open(jsonFilePath, "w") as jsonFile:
    jsonFile.write(json.dumps(arr, indent = 2))