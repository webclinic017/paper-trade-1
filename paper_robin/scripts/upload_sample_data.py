import os
import csv

from paper_robin.apps.stock.models import Stock

def upload_sample_data():
    with open(os.path.join(os.path.dirname(__file__), '../data/nasdaq-listing.csv')) as csvfile:
        csv_reader = csv.reader(csvfile)
        for row in csv_reader:
            Stock.objects.create(name=row[1], symbol=row[0])
