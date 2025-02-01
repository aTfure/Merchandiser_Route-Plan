# Generated by Django 5.1.5 on 2025-01-31 03:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('merchandisers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='merchandiser',
            name='email',
            field=models.EmailField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='merchandiser',
            name='first_name',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='merchandiser',
            name='last_name',
            field=models.CharField(max_length=50),
        ),
    ]
