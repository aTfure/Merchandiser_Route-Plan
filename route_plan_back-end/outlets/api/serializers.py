from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from outlets.models import Outlet, ChannelType
from merchandisers.models import Merchandiser


class ChannelTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChannelType
        fields = '__all__'


class OutletSerializer(serializers.ModelSerializer):
    channel_type_id = serializers.PrimaryKeyRelatedField(
        queryset=ChannelType.objects.all(),
        source="channel_type",
        write_only=True,
        required=True
    )

    channel_type = serializers.CharField(
        source='channel_type.name',
        read_only=True
    )
    class Meta:
        model = Outlet
        fields = [
            'id',
            'name',
            'location',
            'channel_type_id',
            'channel_type'
        ]

class OutletGeoSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Outlet
        geo_field = 'location'
        fields = ('id', 'name', 'channel_type')