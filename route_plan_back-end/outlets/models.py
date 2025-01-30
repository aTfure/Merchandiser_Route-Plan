from django.db import models
from django.utils import timezone

class ChannelType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'channel_types'

class Outlet(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    channel_type = models.ForeignKey(ChannelType, on_delete=models.CASCADE)
    merchandiser = models.ForeignKey('merchandisers.Merchandiser', on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_outlets')
    assigned_date = models.DateTimeField(default=timezone.now)

    
    def __str__(self):
        return f"{self.name} - {self.location}"

    class Meta:
        db_table = 'outlets'