from django.db import models
from outlets.models import Outlet

class Route(models.Model):
    """Represents a collection of outlets in specific order"""
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'routes'
        ordering = ['-created_at']

    def __str__(self):
        return self.name

class RouteOutlet(models.Model):
    """Links outlets to routes with ordering"""
    route = models.ForeignKey(
        Route, 
        on_delete=models.CASCADE, 
        related_name='route_outlets'
    )
    outlet = models.ForeignKey(
        Outlet, 
        on_delete=models.CASCADE
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'route_outlets'
        ordering = ['order']
        unique_together = [('route', 'outlet')]

    def __str__(self):
        return f"{self.route.name} - {self.outlet.name} (Order: {self.order})"