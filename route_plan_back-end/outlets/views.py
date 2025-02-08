from rest_framework import viewsets, permissions
from outlets.models import Outlet, ChannelType
from outlets.api.serializers import OutletSerializer, ChannelTypeSerializer, OutletGeoSerializer
from rest_framework_gis import filters


class OutletViewSet(viewsets.ModelViewSet):
    queryset = Outlet.objects.all()
    serializer_class = OutletSerializer
    permission_classes = [permissions.DjangoModelPermissions]


class OutletMapViewSet(viewsets.ReadOnlyModelViewSet):
    bbox_filter_field = 'location'
    filter_backends = [filters.InBBoxFilter]
    queryset = Outlet.objects.all()
    serializer_class = OutletGeoSerializer



class ChannelTypeViewSet(viewsets.ModelViewSet):
    queryset = ChannelType.objects.all()
    serializer_class = ChannelTypeSerializer
    permission_classes = [permissions.DjangoModelPermissions]
