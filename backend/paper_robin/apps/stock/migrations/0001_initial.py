# Generated by Django 3.0.2 on 2020-03-01 06:40

from django.conf import settings
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('symbol', models.CharField(db_index=True, max_length=25, unique=True)),
                ('name', models.CharField(db_index=True, max_length=255)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='StockExchange',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('name_abbr', models.CharField(max_length=25, unique=True)),
                ('name', models.CharField(max_length=255)),
                ('timezone', models.CharField(max_length=50)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='StockPortfolio',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('principal', models.DecimalField(decimal_places=2, max_digits=15)),
                ('purchasing_power', models.DecimalField(decimal_places=2, default=0, max_digits=15)),
                ('properties', django.contrib.postgres.fields.jsonb.JSONField(default=dict)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='StockPosition',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('shares', models.IntegerField()),
                ('purchase_price', models.DecimalField(decimal_places=2, max_digits=5)),
                ('portfolio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='stock.StockPortfolio')),
                ('stock', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='stock.Stock')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='stock',
            name='exchanges',
            field=models.ManyToManyField(to='stock.StockExchange'),
        ),
        migrations.CreateModel(
            name='DailyStockData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('date', models.DateField()),
                ('time_zone', models.CharField(max_length=50)),
                ('last_refreshed', models.CharField(max_length=50)),
                ('price_data', django.contrib.postgres.fields.jsonb.JSONField()),
                ('symbol', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='stock.Stock')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
