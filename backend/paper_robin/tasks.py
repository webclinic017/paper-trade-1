import os
import csv
import requests
import json
from datetime import datetime
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from paper_robin.celery import app
from paper_robin.apps.stock.models import DailyStockData, Stock
from paper_robin.data.utils import timestring_to_epoch

def merge(d1, d2, merge_fn=lambda x,y:y):
    """
    Merges two dictionaries, non-destructively, combining 
    values on duplicate keys as defined by the optional merge
    function.
    """

    result = dict(d1)
    for k,v in d2.items():
        if k in result:
            result[k] = merge_fn(result[k], v)
        else:
            result[k] = v
    return result


@app.task
def hello():
    print("hello")

def fetch_intraday_data(symbol):
    payload = {'function': 'TIME_SERIES_INTRADAY', 'symbol': symbol, 'interval': '1min', 'apikey': 'demo'}
    r = requests.get('https://www.alphavantage.co/query', params=payload)
    
    if r.status_code == 200:
        data = json.loads(r.content)
        time_series = data.get('Time Series (1min)', {})
        grouped_series_data = defaultdict(dict)

        for (timestring, value) in time_series.items():
            date, time = timestring.split(' ')
            timestamp = timestring_to_epoch(timestring)
            grouped_series_data[date][timestamp] = value

        for date in grouped_series_data:
            stock = Stock.objects.get(symbol=symbol)
            dsd = DailyStockData.objects.filter(symbol=stock, date=date).first()

            if dsd:
                dsd.price_data = merge(grouped_series_data[date], dsd.price_data)
                dsd.save()
            else:
                try:
                    tz = data.get('Meta Data', {}).get('6. Time Zone')
                    dsd = DailyStockData.objects.create(
                        symbol=stock,
                        date=date,
                        time_zone=tz,
                        last_refreshed=data.get('3. Last Refreshed', ""),
                        price_data=grouped_series_data[date],
                    )
                except Exception as ex:
                    print(ex)
    else:
        print(r.status_code, "failed to fetch intraday day for {}".format(symbol))


pool = ThreadPoolExecutor(max_workers=5)

@app.task
def get_intraday_data(): 

    symbols = ['MSFT', "bob"]
    pool.map(fetch_intraday_data, symbols)

    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)("broadcast",  {"type": "intraday_data_loaded", "text": "herllo!!"})
