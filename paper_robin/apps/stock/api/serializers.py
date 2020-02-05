from rest_framework import serializers
from paper_robin.apps.stock.models import Stock, DailyStockData


class Stock(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['id', 'name', 'symbol']



class DailyStockData(serializers.ModelSerializer):
    class Meta:
        model = DailyStockData
        fields = ['id']
