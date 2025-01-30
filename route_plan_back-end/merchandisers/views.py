from rest_framework import viewsets, permissions
from merchandisers.models import Merchandiser
from merchandisers.api.serializers import MerchandiserSerializer

class MerchandiserViewSet(viewsets.ModelViewSet):
    queryset = Merchandiser.objects.all()
    serializer_class = MerchandiserSerializer
    permission_classes = [permissions.DjangoModelPermissions]


