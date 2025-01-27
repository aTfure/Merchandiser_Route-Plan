from django.db import models

class ChannelType(models.Model):
    channel_type_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'channel_types'

class Outlet(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    channel_type = models.ForeignKey(ChannelType, on_delete=models.CASCADE)

    
    def __str__(self):
        return f"{self.name} - {self.location}"

    class Meta:
        db_table = 'outlets'