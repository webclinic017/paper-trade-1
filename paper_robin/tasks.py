import os
import random
import string
import csv

from paper_robin.celery import app
from paper_robin.apps.stock.models import Stock
from paper_robin.settings import BASE_DIR

def randomString(stringLength=10):
    """Generate a random string of fixed length """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))


@app.task
def hello():
    Stock.objects.create(name=randomString(), symbol=randomString())


@app.task
def upload_sample_data():
    with open(os.path.join(os.path.dirname(__file__), 'data/nasdaq-listing.csv')) as csvfile:
        csv_reader = csv.reader(csvfile)
        for row in csv_reader:
            print(row)


