from rest_framework import serializers
from routes.models import Route, RouteOutlet
from outlets.api.serializers import OutletSerializer
from outlets.models import Outlet
from django.utils import timezone

class OutletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outlet
        fields = '__all__'

class RouteOutletSerializer(serializers.ModelSerializer):
    outlet = OutletSerializer(read_only=True)

    class Meta:
        model = RouteOutlet
        fields = ['order', 'outlet']

class RouteSerializer(serializers.ModelSerializer):
    route_outlets = RouteOutletSerializer(many=True, read_only=True)
    assigned_outlets = OutletSerializer(many=True, read_only=True)
    outlet_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Route
        fields = ['id', 'name', 'outlet_ids', 'assigned_outlets', 'created_at', 'route_outlets']

    def create(self, validated_data):
        outlet_ids = validated_data.pop('outlet_ids', [])
        route = Route.objects.create(**validated_data)

        # Create RouteOutlet entries for each outlet in order
        for index, outlet_id in enumerate(outlet_ids):
            outlet = Outlet.objects.get(id=outlet_id)
            RouteOutlet.objects.create(route=route, outlet=outlet, order=index + 1)

        return route

    def update(self, instance, validated_data):
        outlet_ids = validated_data.pop('outlet_ids', None)

        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # If outlet_ids is provided, update the RouteOutlet entries
        if outlet_ids is not None:
            # Delete existing RouteOutlet entries for this route
            RouteOutlet.objects.filter(route=instance).delete()

            # Create new RouteOutlet entries in the given order
            for index, outlet_id in enumerate(outlet_ids):
                outlet = Outlet.objects.get(id=outlet_id)
                RouteOutlet.objects.create(route=instance, outlet=outlet, order=index + 1)

        return instance