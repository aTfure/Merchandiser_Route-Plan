# Generated by Django 5.1.5 on 2025-02-04 23:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('outlets', '0003_rename_merchandisers_outlet_merchandiser'),
    ]

    operations = [
        migrations.CreateModel(
            name='Route',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'routes',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='RouteOutlet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=0)),
                ('outlet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='outlets.outlet')),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='route_outlets', to='routes.route')),
            ],
            options={
                'db_table': 'route_outlets',
                'ordering': ['order'],
                'unique_together': {('route', 'outlet')},
            },
        ),
    ]
