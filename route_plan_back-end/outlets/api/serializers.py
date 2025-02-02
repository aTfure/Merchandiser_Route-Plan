from rest_framework import serializers
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
    merchandiser_id = serializers.PrimaryKeyRelatedField(
        queryset=Merchandiser.objects.all(),
        source='merchandiser',
        allow_null=True,
        required=False,
        write_only=True
    )
    merchandiser = serializers.CharField(
        source='merchandiser.full_name',
        read_only=True
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
            'channel_type',
            'merchandiser_id',
            'merchandiser',
            'assigned_date'
        ]