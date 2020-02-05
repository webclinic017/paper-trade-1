from rest_framework import serializers
from paper_robin.apps.stock.models import Stock, DailyStockData


class Stock(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ["id", "name", "symbol"]


class DailyStockData(serializers.ModelSerializer):
    class Meta:
        model = DailyStockData
        fields = [
            "symbol",
            "date",
            "current_price",
            "price_open",
            "day_high",
            "day_low",
            "high_52_weeks",
            "low_52_weeks",
            "time_zone",
            "volume",
            "volume_avg",
            "price_data",
        ]
