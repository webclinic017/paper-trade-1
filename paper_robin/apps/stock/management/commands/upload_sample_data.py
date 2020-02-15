import os
import csv
from datetime import date

from paper_robin.apps.stock.models import DailyStockData, Stock
from paper_robin.settings import BASE_DIR

from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):

    def handle(self, *args, **options):
        with open(os.path.join(BASE_DIR, 'paper_robin/data/nasdaq-listing.csv')) as csvfile:
            csv_reader = csv.reader(csvfile)
            next(csv_reader)

            for row in csv_reader:
                try:
                    Stock.objects.create(name=row[1], symbol=row[0])
                except:
                    break

        with open(os.path.join(BASE_DIR, 'paper_robin/data/snap-intraday-sample.csv')) as csvfile:
            csv_reader = csv.reader(csvfile)
            next(csv_reader)

            snap_stock = Stock.objects.filter(symbol="SNAP").first()

            price_data = {}
            for row in csv_reader:
                timestamp = row[0].split(' ')[1]
                price_data[timestamp] = row[1]

            daily_stock_data = DailyStockData.objects.create(
                symbol=snap_stock, date=date(2020, 2, 13), current_price=17.59, price_open=17.59, day_high=17.59, day_low = 17.59, high_52_weeks=17.59, low_52_weeks=17.59, time_zone='EST', volume=17229, volume_avg=17229, price_data=price_data)

        
        
