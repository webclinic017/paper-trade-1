from rest_framework.routers import DefaultRouter

from paper_robin.apps.stock.api import views

app_name = "stocks"

router = DefaultRouter()
router.register("stocks", views.StockViewSet)
router.register("daily_stock_data", views.DailyStockDataViewSet)
router.register("stock_porfolios", views.StockPortfolioViewSet)
router.register("stocks_positions", views.StockPositionViewSet)
urlpatterns = router.urls
