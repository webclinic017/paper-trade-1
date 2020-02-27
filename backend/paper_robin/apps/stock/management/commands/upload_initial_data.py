import os
import csv
from datetime import date
from django.core.management.base import BaseCommand, CommandError

from paper_robin.apps.stock.models import DailyStockData, Stock
from paper_robin.settings import BASE_DIR
from paper_robin.data.utils import timestring_to_epoch



class Command(BaseCommand):
    def handle(self, *args, **options):

        # uploads all stocks listed on nasdaq
        with open(
            os.path.join(BASE_DIR, "paper_robin/data/nasdaq-listing.csv")
        ) as csvfile:
            csv_reader = csv.reader(csvfile)
            next(csv_reader)

            for row in csv_reader:
                try:
                    Stock.objects.create(name=row[1], symbol=row[0])
                except:
                    break
        
        with open(
            os.path.join(BASE_DIR, "paper_robin/data/snap-intraday-sample.csv")
        ) as csvfile:
            csv_reader = csv.reader(csvfile)
            next(csv_reader)

            snap_stock = Stock.objects.filter(symbol="SNAP").first()

            price_data = {}
            for row in csv_reader:
                time_stamp = timestring_to_epoch(row[0])
                price_data[time_stamp] = row[1]

        
            DailyStockData.objects.create(
                symbol=snap_stock,
                date=date(2020, 2, 13),
                time_zone="US/Eastern",
                price_data=price_data
            )
