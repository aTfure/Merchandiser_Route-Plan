from rest_framework import serializers
from merchandisers.models import Merchandiser
from outlets.models import Outlet
from routes.models import Route, RouteOutlet
from outlets.api.serializers import OutletSerializer
from services.email_service import send_route_email

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
        
        # Create RouteOutlet entries for each outlet
        for index, outlet_id in enumerate(outlet_ids):
            outlet = Outlet.objects.get(id=outlet_id)
            RouteOutlet.objects.create(route=route, outlet=outlet, order=index + 1)

            if route.merchandiser:
                send_route_email(route.merchandiser, route)
        
        return route
    
    def update(self, instance, validated_data):
        outlet_ids = validated_data.pop('outlet_ids', None)
        new_merchandiser = validated_data.get('merchandiser', instance.merchandiser)
        
        # Update Route fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update outlets if provided
        if outlet_ids is not None:
            RouteOutlet.objects.filter(route=instance).delete()
            for index, outlet_id in enumerate(outlet_ids):
                outlet = Outlet.objects.get(id=outlet_id)
                RouteOutlet.objects.create(route=instance, outlet=outlet, order=index + 1)


        # Send email only if the merchandiser has not changed

        if new_merchandiser != instance.merchandiser and new_merchandiser is not None:
            send_route_email(new_merchandiser, instance)
        
        return instance