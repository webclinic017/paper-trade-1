from django.contrib.postgres.fields import JSONField
from django.db import models
from model_utils.models import TimeStampedModel

from paper_robin.apps.user.models import User


""" Example of what we're working with, similar across services
{
    "symbols_requested": 1,
    "symbols_returned": 1,
    "data": [
        {
            "symbol": "SNAP",
            "name": "Snap Inc.",
            "currency": "USD",
            "price": "18.38",
            "price_open": "18.73",
            "day_high": "18.79",
            "day_low": "18.18",
            "52_week_high": "19.76",
            "52_week_low": "6.70",
            "day_change": "-0.50",
            "change_pct": "-2.65",
            "close_yesterday": "18.88",
            "market_cap": "25731448832",
            "volume": "24752512",
            "volume_avg": "23013925",
            "shares": "1138349952",
            "stock_exchange_long": "New York Stock Exchange",
            "stock_exchange_short": "NYSE",
            "timezone": "EST",
            "timezone_name": "America/New_York",
            "gmt_offset": "-18000",
            "last_trade_time": "2020-01-31 16:03:40",
            "pe": "N/A",
            "eps": "-0.72"
        }
    ]
}
"""


class Stock(TimeStampedModel):
    name = models.CharField(max_length=255)
    symbol = models.CharField(max_length=15, unique=True)


class StockPortfolio(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    principal = models.DecimalField(decimal_places=2, max_digits=15)
    purchasing_power = models.DecimalField(decimal_places=2, max_digits=15, default=0)


class StockPosition(TimeStampedModel):
    portfolio = models.ForeignKey(StockPortfolio, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    shares = models.IntegerField()
    purchase_price = models.DecimalField(decimal_places=2, max_digits=5)


# class OptionsPosition(models.Model)


class DailyStockData(TimeStampedModel):
    symbol = models.ForeignKey("Stock", on_delete=models.CASCADE)
    date = models.DateField()
    current_price = models.DecimalField(
        decimal_places=2, max_digits=5
    )  # all U.S. securities trade to 2 decimal places
    price_open = models.DecimalField(decimal_places=2, max_digits=5)
    day_high = models.DecimalField(decimal_places=2, max_digits=5)
    day_low = models.DecimalField(decimal_places=2, max_digits=5)
    high_52_weeks = models.DecimalField(decimal_places=2, max_digits=5)
    low_52_weeks = models.DecimalField(decimal_places=2, max_digits=5)
    time_zone = models.CharField(max_length=50)
    volume = models.IntegerField()
    volume_avg = models.IntegerField()

    # temporary solution is to aggregate daily data into one json
    # to avoid storing a huge amount of data, will revisit
    price_data = JSONField()
