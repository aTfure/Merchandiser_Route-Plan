from django.db import models
from users.models import User

class Merchandiser(User):
    outlets = models.ManyToManyField('outlets.Outlet', through='merchandisers.OutletMerchandiser')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        db_table = 'merchandisers'

class OutletMerchandiser(models.Model):
    outlet = models.ForeignKey('outlets.Outlet', on_delete=models.CASCADE)
    merchandiser = models.ForeignKey('merchandisers.Merchandiser', on_delete=models.CASCADE)

    class Meta:
        db_table = 'outlet_merchandisers'
        unique_together = ['outlet', 'merchandiser']

    def __str__(self):
        return f"{self.merchandiser} at {self.outlet}"