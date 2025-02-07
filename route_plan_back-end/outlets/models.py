from django.db import models
from django.utils import timezone
from django.contrib.gis.db import models

class ChannelType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'channel_types'

class Outlet(models.Model):
    name = models.CharField(max_length=100)
    location = models.PointField(srid=4326)
    channel_type = models.ForeignKey(ChannelType, on_delete=models.CASCADE)

    
    def __str__(self):
        return f"{self.name} - {self.location}"

    class Meta:
        db_table = 'outlets'