# Generated by Django 3.0.2 on 2020-03-01 22:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_user_last_connected'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='connected',
            field=models.BooleanField(default=False),
        ),
    ]