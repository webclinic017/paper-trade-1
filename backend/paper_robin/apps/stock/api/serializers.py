from rest_framework import serializers
from paper_robin.apps.stock.models import (
    DailyStockData,
    Stock,
    StockPortfolio,
    StockPosition,
)


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ["id", "name", "symbol"]


class DailyStockDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyStockData
        fields = [
            "id",
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


class StockPortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockPortfolio
        fields = ["id", "user", "principal", "purchasing_power"]


class StockPositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockPosition
        fields = ["id", "portfolio", "stock", "shares", "purchase_price"]
