import os
import csv

from paper_robin.celery import app
from paper_robin.apps.stock.models import Stock

@app.task
def hello():
    print('hello')


