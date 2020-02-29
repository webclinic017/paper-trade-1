from rest_framework import serializers
from paper_robin.apps.stock.models import (
    DailyStockData,
    Stock,
    StockExchange,
    StockPortfolio,
    StockPosition,
)

class StockExchangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockExchange
        fields = ["id", "name_abbr", "name"]

class StockSerializer(serializers.ModelSerializer):
    exchanges = StockExchangeSerializer(many=True)

    class Meta:
        model = Stock
        fields = ["id", "name", "symbol", "exchanges"]


class DailyStockDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = DailyStockData
        fields = [
            "id",
            "symbol",
            "date",
            "time_zone",
            "price_data",
        ]


class StockPositionSerializer(serializers.ModelSerializer):
    #stock_name = serializers.CharField(read_only=True, source="stock.name")
    
    class Meta:
        model = StockPosition
        fields = ["id", "portfolio", "stock", "shares", "purchase_price"]

class StockPortfolioSerializer(serializers.ModelSerializer):
    stockposition_set = StockPositionSerializer(many=True)    

    class Meta:
        model = StockPortfolio
        fields = ["id", "user", "principal", "purchasing_power", "properties", "stockposition_set"]



