# Generated by Django 3.0.2 on 2020-02-27 21:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("stock", "0005_auto_20200221_0526"),
    ]

    operations = [
        migrations.RemoveField(model_name="dailystockdata", name="current_price",),
        migrations.RemoveField(model_name="dailystockdata", name="day_high",),
        migrations.RemoveField(model_name="dailystockdata", name="day_low",),
        migrations.RemoveField(model_name="dailystockdata", name="high_52_weeks",),
        migrations.RemoveField(model_name="dailystockdata", name="low_52_weeks",),
        migrations.RemoveField(model_name="dailystockdata", name="price_open",),
        migrations.RemoveField(model_name="dailystockdata", name="volume",),
        migrations.RemoveField(model_name="dailystockdata", name="volume_avg",),
    ]