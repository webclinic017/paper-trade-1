from rest_framework import viewsets, permissions


from paper_robin.apps.stock.models import (
    DailyStockData,
    Stock,
    StockPortfolio,
    StockPosition,
)
from paper_robin.apps.stock.api.serializers import (
    DailyStockDataSerializer,
    StockPortfolioSerializer,
    StockPositionSerializer,
    StockSerializer,
)


class StockViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing stock instances.
    """

    serializer_class = StockSerializer
    queryset = Stock.objects.all()


class DailyStockDataViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing user instances.
    """

    serializer_class = DailyStockDataSerializer
    queryset = DailyStockData.objects.all()


class StockPortfolioViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing stock portfolio instances.
    """

    serializer_class = StockPortfolioSerializer
    queryset = StockPortfolio.objects.all()


class StockPositionViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing stock position instances.
    """

    serializer_class = StockPositionSerializer
    queryset = StockPosition.objects.all()
