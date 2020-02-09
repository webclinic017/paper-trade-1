from rest_framework import viewsets, permissions

from paper_robin.apps.stock.models import Stock, DailyStockData
from paper_robin.apps.stock.api.serializers import StockSerializer, DailyStockDataSerializer


class StockViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing and editing stock instances.
    """

    serializer_class = StockSerializer
    queryset = Stock.objects.all()


class DailyStockDataViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """

    serializer_class = DailyStockDataSerializer
    queryset = DailyStockData.objects.all()
