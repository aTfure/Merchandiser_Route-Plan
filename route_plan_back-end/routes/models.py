from django.db import models
from outlets.models import Outlet

class Route(models.Model):
    """Represents a collection of outlets in specific order"""
    merchandiser = models.ForeignKey('merchandisers.Merchandiser', on_delete=models.SET_NULL, null=True, blank=True, related_name='routes')
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
    

class RouteSchedule(models.Model):
    """Represents a schedule visit for a route"""

    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name='route_schedules')
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('SCHEDULED', 'Scheduled'),
            ('COMPLETED', 'Completed'),
            ('CANCELLED', 'Cancelled')
        ],
        default='SCHEDULED'
    )
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.route.name} - {self.start_date}"
    class Meta:
        db_table = 'route_schedules'
        ordering = ['start_date']
        unique_together = [('route', 'start_date')]
    
class AvailableTime(models.Model):
    route_schedule = models.ForeignKey(RouteSchedule, on_delete=models.CASCADE, related_name='available_time')
    day_of_week = models.IntegerField(choices=[(0, 'Monday'), (1, 'Tuesday'), (2, 'Wednesday'), (3, 'Thursday'), (4, 'Friday'), (5, 'Saturday'), (6, 'Sunday')])
    start_time = models.TimeField()
    end_time = models.TimeField()


    class Meta:
        unique_together = ('route_schedule', 'day_of_week')

    