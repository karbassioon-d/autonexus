# Generated by Django 4.0.3 on 2023-05-03 19:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0003_alter_customer_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='sold',
            field=models.BooleanField(default=False),
        ),
    ]
