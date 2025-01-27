from django.db import models
from django.utils import timezone
from users.models import CustomUser
from outlets.models import ChannelType

class Merchandiser(models.Model):
    """
    Profile for Merchandisers
    """
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50, default='Joe')
    last_name = models.CharField(max_length=50, default='Doe')
    email = models.EmailField(default='example@email.com')
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    created = models.DateTimeField(default=timezone.now)
    outlets = models.ManyToManyField('outlets.Outlet', through='merchandisers.OutletMerchandiser')

    class Meta:
        db_table = 'merchandisers'
    
    def __str__(self):
        return self.full_name()
    
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

class OutletMerchandiser(models.Model):
    manager = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=1)
    date_time = models.DateTimeField(default=timezone.now)
    outlet = models.ForeignKey('outlets.Outlet', on_delete=models.CASCADE)
    channel_type = models.ForeignKey('outlets.ChannelType', on_delete=models.CASCADE, default=1)
    merchandiser = models.ForeignKey('merchandisers.Merchandiser', on_delete=models.CASCADE)
    assigned_date = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'outlet_merchandisers'
        unique_together = ['outlet', 'merchandiser']

    def __str__(self):
        return f"{self.merchandiser.full_name()}"