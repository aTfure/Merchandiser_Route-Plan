from rest_framework import serializers
from outlets.models import Outlet, ChannelType


class ChannelTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChannelType
        fields = ['id', 'channel_type']


class OutletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outlet
        fields = ['id', 'outlet']