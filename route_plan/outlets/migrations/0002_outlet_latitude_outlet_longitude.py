# Generated by Django 5.1.5 on 2025-01-24 23:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('outlets', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='outlet',
            name='latitude',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='outlet',
            name='longitude',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
