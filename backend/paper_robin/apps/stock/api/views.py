from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q


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

    @action(detail=False, methods=['get'], url_path="autocomplete/(?P<q>\w+)")
    def autocomplete(self, request, q=""):
        print("wedhasd", q)
        stocks = Stock.objects.filter(Q(symbol__istartswith=q) | Q(name__istartswith=q)).all()[:10]
        serializer = self.get_serializer(stocks, many=True)
        return Response(serializer.data)


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
