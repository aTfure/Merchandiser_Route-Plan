from rest_framework import serializers
from merchandisers.models import Merchandiser
from outlets.models import Outlet
from routes.models import Route, RouteOutlet, RouteSchedule, AvailableTime
from outlets.api.serializers import OutletSerializer
from services.email_service import send_schedule_notification

class RouteOutletSerializer(serializers.ModelSerializer):
    outlet = OutletSerializer(read_only=True)
    
    class Meta:
        model = RouteOutlet
        fields = ['order', 'outlet']

class RouteSerializer(serializers.ModelSerializer):
    route_outlets = RouteOutletSerializer(many=True, read_only=True)
    outlet_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )
    merchandiser_id = serializers.PrimaryKeyRelatedField(
        queryset=Merchandiser.objects.all(),
        source='merchandiser',
        write_only=True,
        allow_null=True,
        required=False
    )
    merchandiser = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Route
        fields = ['id', 'name', 'merchandiser', 'merchandiser_id', 'outlet_ids', 'route_outlets', 'created_at']

    def create(self, validated_data):
        outlet_ids = validated_data.pop('outlet_ids', [])
        route = Route.objects.create(**validated_data)
        self._update_outlets(route, outlet_ids)
        return route
    
    def update(self, instance, validated_data):
        outlet_ids = validated_data.pop('outlet_ids', None)
        new_merchandiser = validated_data.get('merchandiser', instance.merchandiser)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if outlet_ids is not None:
            self._update_outlets(instance, outlet_ids)

        if new_merchandiser != instance.merchandiser and new_merchandiser is not None:
            send_schedule_notification(new_merchandiser, instance)
        
        return instance
    
    def _update_outlets(self, route, outlet_ids):
        RouteOutlet.objects.filter(route=route).delete()
        route_outlets = [
            RouteOutlet(route=route, outlet_id=outlet_id, order=index + 1)
            for index, outlet_id in enumerate(outlet_ids)
        ]
        RouteOutlet.objects.bulk_create(route_outlets)

class AvailableTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailableTime
        fields = ['id', 'day_of_week', 'start_time', 'end_time']
        read_only_fields = ['id']

class RouteScheduleSerializer(serializers.ModelSerializer):
    route_name = serializers.CharField(source='route.name', read_only=True)
    merchandiser_name = serializers.CharField(
        source='route.merchandiser.full_name',
        read_only=True
    )
    available_time = AvailableTimeSerializer(many=True, required=False)

    class Meta:
        model = RouteSchedule
        fields = '__all__'

    def create(self, validated_data):
        available_times_data = validated_data.pop('available_time', [])
        route_schedule = RouteSchedule.objects.create(**validated_data)

        for at_data in available_times_data:
            AvailableTime.objects.create(
                route_schedule=route_schedule,
                day_of_week=at_data['day_of_week'],
                start_time=at_data['start_time'],
                end_time=at_data['end_time']
                )
        
        send_schedule_notification(route_schedule)
        return route_schedule
    
    def update(self, instance, validated_data):
        available_times_data = validated_data.pop('available_data', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        instance.available_time.all().delete()
        for at_data in available_times_data:
            AvailableTime.objects.create(
                route_schedule=instance,
                day_of_week=at_data['day_of_week'],
                start_time=at_data['start_time'],
                end_time=at_data['end_time']
            )
        
        return instance

