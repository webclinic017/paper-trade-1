# Generated by Django 3.0.2 on 2020-03-01 17:29

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stockportfolio',
            name='properties',
            field=django.contrib.postgres.fields.jsonb.JSONField(default={'watch_list': []}),
        ),
    ]
