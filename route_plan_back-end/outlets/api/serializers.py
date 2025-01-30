from rest_framework import serializers
from outlets.models import Outlet, ChannelType


class ChannelTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChannelType
        fields = '__all__'


class OutletSerializer(serializers.ModelSerializer):
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
        fields = '__all__'