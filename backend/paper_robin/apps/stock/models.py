from django.contrib.postgres.fields import JSONField
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from model_utils.models import TimeStampedModel

from paper_robin.apps.user.models import User


class Stock(TimeStampedModel):
    symbol = models.CharField(max_length=15, unique=True, db_index=True)
    name = models.CharField(max_length=255, db_index=True)


class StockPortfolio(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    principal = models.DecimalField(decimal_places=2, max_digits=15)
    purchasing_power = models.DecimalField(decimal_places=2, max_digits=15, default=0)
    properties = JSONField(default=dict)


@receiver(post_save, sender=User)
def create_stock_portfolio(sender, instance, created, **kwargs):
    if created:
        StockPortfolio.objects.create(user=instance, principal=0, purchasing_power=0)


class StockPosition(TimeStampedModel):
    portfolio = models.ForeignKey(StockPortfolio, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    shares = models.IntegerField()
    purchase_price = models.DecimalField(decimal_places=2, max_digits=5)


# class OptionsPosition(models.Model)


class DailyStockData(TimeStampedModel):
    symbol = models.ForeignKey("Stock", on_delete=models.CASCADE)
    date = models.DateField()
    time_zone = models.CharField(max_length=50)
    price_data = JSONField()
