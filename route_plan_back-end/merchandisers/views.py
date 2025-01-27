from rest_framework import viewsets, permissions
from merchandisers.models import Merchandiser, OutletMerchandiser
from merchandisers.api.serializers import MerchandiserSerializer, OutletMerchandiserSerializer

class MerchandiserViewSet(viewsets.ModelViewSet):
    queryset = Merchandiser.objects.all()
    serializer_class = MerchandiserSerializer
    permission_classes = [permissions.DjangoModelPermissions]


class OutletMerchandiserViewSet(viewsets.ModelViewSet):
    queryset = OutletMerchandiser.objects.all()
    serializer_class = OutletMerchandiserSerializer
    permission_classes = [permissions.DjangoModelPermissions]


