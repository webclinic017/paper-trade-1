# Generated by Django 3.0.2 on 2020-02-09 01:44

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Stock",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50)),
                ("symbol", models.CharField(max_length=15, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="DailyStockData",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("date", models.DateField()),
                ("current_price", models.DecimalField(decimal_places=2, max_digits=5)),
                ("price_open", models.DecimalField(decimal_places=2, max_digits=5)),
                ("day_high", models.DecimalField(decimal_places=2, max_digits=5)),
                ("day_low", models.DecimalField(decimal_places=2, max_digits=5)),
                ("high_52_weeks", models.DecimalField(decimal_places=2, max_digits=5)),
                ("low_52_weeks", models.DecimalField(decimal_places=2, max_digits=5)),
                ("time_zone", models.CharField(max_length=50)),
                ("volume", models.IntegerField()),
                ("volume_avg", models.IntegerField()),
                ("price_data", django.contrib.postgres.fields.jsonb.JSONField()),
                (
                    "symbol",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="stock.Stock"
                    ),
                ),
            ],
        ),
    ]
