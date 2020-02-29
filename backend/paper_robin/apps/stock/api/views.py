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

    def get_permissions(self):
        if self.action == "autocomplete":
            return [
                permissions.AllowAny(),
            ]
        return super(StockViewSet, self).get_permissions()

    # deprecate this
    @action(detail=False, methods=["get"], url_path="autocomplete/(?P<q>\w+)")
    def autocomplete(self, request, q=""):
        stocks = Stock.objects.filter(
            Q(symbol__istartswith=q) | Q(name__istartswith=q)
        ).all()[:10]
        serializer = self.get_serializer(stocks, many=True)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        query_params = request.query_params

        q_objects = Q()
        for param in query_params:
            q_object = Q()

            value = query_params[param].split('|')
            for v in value:
                q_object |= Q(**{param: v})
            
            q_objects &= q_object

            print(q_objects)

        data = Stock.objects.filter(q_objects)
        serializer = self.get_serializer(data, many=True)

        return Response(serializer.data)


class DailyStockDataViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing user instances.
    """

    serializer_class = DailyStockDataSerializer
    queryset = DailyStockData.objects.all()

    def list(self, request, *args, **kwargs):
        query_params = request.query_params

        q_objects = Q()
        for param in query_params:
            q_objects &= Q(**{param: query_params[param]})

        data = DailyStockData.objects.filter(q_objects)
        serializer = self.get_serializer(data, many=True)

        return Response(serializer.data)


class StockPortfolioViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing stock portfolio instances.
    """

    serializer_class = StockPortfolioSerializer
    queryset = StockPortfolio.objects.all()

    def list(self, request, *args, **kwargs):
        query_params = request.query_params

        q_objects = Q()
        for param in query_params:
            q_objects &= Q(**{param: query_params[param]})

        data = StockPortfolio.objects.filter(q_objects)
        serializer = self.get_serializer(data, many=True)

        return Response(serializer.data)


class StockPositionViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing stock position instances.
    """

    serializer_class = StockPositionSerializer
    queryset = StockPosition.objects.all()
