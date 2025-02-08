# Generated by Django 5.1.6 on 2025-02-07 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('routes', '0003_routeschedule_end_date_alter_routeschedule_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='routeschedule',
            name='status',
            field=models.CharField(choices=[('SCHEDULED', 'Scheduled'), ('COMPLETED', 'Completed'), ('CANCELLED', 'Cancelled')], default='SCHEDULED', max_length=20),
        ),
    ]
