# Generated by Django 3.0.2 on 2020-03-01 19:37

import django.contrib.postgres.fields.jsonb
from django.db import migrations
import paper_robin.apps.stock.models


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0002_auto_20200301_1729'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stockportfolio',
            name='properties',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=paper_robin.apps.stock.models.stock_portfolio_default_properties),
        ),
    ]