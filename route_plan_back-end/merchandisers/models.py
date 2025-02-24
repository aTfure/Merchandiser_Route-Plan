from django.db import models
from django.utils import timezone

class Merchandiser(models.Model):
    """
    Profile for Merchandisers
    """
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    created = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'merchandisers'
    
    def __str__(self):
        return self.full_name()
    
    def full_name(self):
        return f"{self.first_name} {self.last_name}"