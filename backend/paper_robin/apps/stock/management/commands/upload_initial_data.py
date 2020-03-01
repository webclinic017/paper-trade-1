import os
import csv
from datetime import date
from django.core.management.base import BaseCommand, CommandError

from paper_robin.apps.stock.models import DailyStockData, Stock, StockExchange
from paper_robin.settings import BASE_DIR
from paper_robin.data.utils import timestring_to_epoch


class Command(BaseCommand):
    def handle(self, *args, **options):

        # uploads all stock exchanges
        with open(
            os.path.join(BASE_DIR, "paper_robin/data/exchange-listing.csv")
        ) as csvfile:
            csv_reader = csv.reader(csvfile)
            next(csv_reader)

            for row in csv_reader:
                try:
                    StockExchange.objects.create(name_abbr=row[0], name=row[1], timezone=row[2])
                except:
                    break

        # uploads all stocks listed on nasdaq
        with open(
            os.path.join(BASE_DIR, "paper_robin/data/nasdaq-listing.csv")
        ) as csvfile:
            csv_reader = csv.reader(csvfile)
            next(csv_reader)

            for row in csv_reader:
                try:
                    exchange = StockExchange.objects.get(name_abbr='NASDAQ')
                    stock = Stock.objects.create(name=row[1], symbol=row[0])
                    stock.exchanges.add(exchange)
                except:
                    break
            
