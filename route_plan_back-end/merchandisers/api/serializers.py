from rest_framework import serializers
from users.models import CustomUser
from merchandisers.models import Merchandiser, OutletMerchandiser
from outlets.api.serializers import OutletSerializer
from outlets.models import Outlet


class OutletMerchandiserSerializer(serializers.ModelSerializer):
    outlet_id = serializers.PrimaryKeyRelatedField(
        queryset=Outlet.objects.all(),
        source='outlet',
        write_only=True
        )

    class Meta:
        model = OutletMerchandiser
        fields = ['outlet_id', 'assigned_date']
        read_only_fields = ['assigned_date']

class MerchandiserSerializer(serializers.ModelSerializer):
    outlets = OutletMerchandiserSerializer(
        source = 'outletmerchandiser_set',
        many=True,
        required=False
    )
    merchandiser_id = serializers.PrimaryKeyRelatedField(
        queryset=Merchandiser.objects.all(),
        source='merchandisers',
        write_only=True,
    )


    class Meta:
        model = Merchandiser
        fields = ['merchandiser_id', 'full_name', 'phone_number', 'email', 'outlets']
        extra_kwargs = {
            'merchandiser': {'read_only': True}
        }

    def create(self, validated_data):
        outlets_data = validated_data.pop('outletmerchandiser_set', [])
        merchandiser = Merchandiser.objects.create(**validated_data)

        for outlet_data in outlets_data:
            OutletMerchandiser.objects.create(
                merchandiser=merchandiser,
                outlet = outlet_data['outlet']
            )

        return merchandiser