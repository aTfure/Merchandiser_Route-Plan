from rest_framework import viewsets, permissions
from outlets.models import Outlet, ChannelType
from outlets.api.serializers import OutletSerializer, ChannelTypeSerializer


class OutletViewSet(viewsets.ModelViewSet):
    queryset = Outlet.objects.all()
    serializer_class = OutletSerializer
    permission_classes = [permissions.DjangoModelPermissions]



class ChannelTypeViewSet(viewsets.ModelViewSet):
    queryset = ChannelType.objects.all()
    serializer_class = ChannelTypeSerializer
    permission_classes = [permissions.DjangoModelPermissions]
