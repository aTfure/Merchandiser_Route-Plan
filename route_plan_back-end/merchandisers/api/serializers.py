from rest_framework import serializers
from merchandisers.models import Merchandiser
from outlets.api.serializers import OutletSerializer
from outlets.models import Outlet
from django.utils import timezone


class OutletSerializer(serializers.ModelSerializer):

    class Meta:
        model = Outlet
        fields = '__all__'

class MerchandiserSerializer(serializers.ModelSerializer):
    assigned_outlets = OutletSerializer(many=True, read_only=True)
    outlet_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Merchandiser
        fields = ['full_name', 'phone_number', 'email', 'assigned_outlets', 'outlet_ids']

    def create(self, validated_data):
        outlets_ids = validated_data.pop('outlet_ids', [])
        merchandiser = Merchandiser.objects.create(**validated_data)
        
        # Assign Outlets to merchandiser    
        if outlets_ids:
            Outlet.objects.filter(id__in=outlets_ids).update(
                merchandiser=merchandiser,
                assigned_date=timezone.now()
            )

        return merchandiser
    
    def update(self, instance, validated_data):
        outlet_ids = validated_data.pop('outlet_ids', None)


        # Update merchandiser fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update outlet assignments if provided
        if outlet_ids is not None:
            # Remove existing assignments
            Outlet.objects.filter(merchandiser=instance).update(
                merchandiser=None,
                assigned_date=None
            )
            # Add New Assignments
            if outlet_ids:
                Outlet.objects.filter(id__in=outlet_ids).update(
                    merchandiser=instance,
                    assigned_date=timezone.now()
                )

        return instance