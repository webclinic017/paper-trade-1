# Generated by Django 3.0.2 on 2020-02-27 23:56

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("stock", "0006_auto_20200227_2149"),
    ]

    operations = [
        migrations.AddField(
            model_name="stockportfolio",
            name="properties",
            field=django.contrib.postgres.fields.jsonb.JSONField(default={}),
        ),
    ]