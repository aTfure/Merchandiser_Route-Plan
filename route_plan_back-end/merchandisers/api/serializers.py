from rest_framework import serializers
from merchandisers.models import Merchandiser
from routes.api.serializers import RouteSerializer
from routes.models import Route

class MerchandiserSerializer(serializers.ModelSerializer):
    routes = RouteSerializer(many=True, read_only=True)
    route_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Merchandiser
        fields = ['id', 'first_name', 'last_name', 'full_name', 'phone_number', 'email', 'routes', 'route_ids']

    def create(self, validated_data):
        route_ids = validated_data.pop('route_ids', [])
        merchandiser = Merchandiser.objects.create(**validated_data)
        
        # Assign Routes to Merchandiser
        if route_ids:
            Route.objects.filter(id__in=route_ids).update(merchandiser=merchandiser)
        
        return merchandiser
    
    def update(self, instance, validated_data):
        route_ids = validated_data.pop('route_ids', None)
        
        # Update Merchandiser fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update Route assignments
        if route_ids is not None:
            # Clear existing routes
            Route.objects.filter(merchandiser=instance).update(merchandiser=None)
            # Assign new routes
            if route_ids:
                Route.objects.filter(id__in=route_ids).update(merchandiser=instance)
        
        return instance