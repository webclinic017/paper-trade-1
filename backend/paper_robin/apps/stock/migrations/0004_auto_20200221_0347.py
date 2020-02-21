# Generated by Django 3.0.2 on 2020-02-21 03:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("stock", "0003_auto_20200216_2131"),
    ]

    operations = [
        migrations.AddIndex(
            model_name="stock",
            index=models.Index(fields=["name"], name="stock_stock_name_5983b0_idx"),
        ),
        migrations.AddIndex(
            model_name="stock",
            index=models.Index(fields=["symbol"], name="stock_stock_symbol_d3f9ae_idx"),
        ),
    ]
