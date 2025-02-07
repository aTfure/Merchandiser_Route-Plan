from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from routes.models import Route, RouteOutlet
from routes.api.serializers import RouteSerializer
# from django.contrib.gis.serializers.geojson import Serializer
from services.email_service import send_route_email



class RouteViewSet(viewsets.ModelViewSet):
    queryset = Route.objects.prefetch_related('route_outlets__outlet')
    serializer_class = RouteSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            # Create the route
            route = Route.objects.create(name=serializer.validated_data['name'])

            # Add outlets through intermediate model
            outlets_data = request.data.get('outlets', [])
            route_outlets = []
            for index, outlet_data in enumerate(outlets_data):
                route_outlets.append(
                    RouteOutlet(
                        route=route,
                        outlet_id=outlet_data['id'],
                        order=index
                    )
                )
            
            # Bulk create route outlets
            RouteOutlet.objects.bulk_create(route_outlets)

            # Refresh route from database to get updated data
            route.refresh_from_db()
            return Response(
                self.get_serializer(route).data, 
                status=status.HTTP_201_CREATED
            )
        
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=True, methods=['POST'])
    def add_outlets(self, request, pk=None):
        try:
            route = self.get_object()
            outlet_ids = request.data.get('outlet_ids', [])
            
            existing_ids = set(route.route_outlets.values_list(
                'outlet_id', 
                flat=True
            ))

            # Create new route outlets
            new_outlets = []
            current_count = len(existing_ids)
            
            for index, outlet_id in enumerate(outlet_ids):
                if outlet_id not in existing_ids:
                    new_outlets.append(
                        RouteOutlet(
                            route=route,
                            outlet_id=outlet_id,
                            order=current_count + index
                        )
                    )
            
            RouteOutlet.objects.bulk_create(new_outlets)

            # Delete removed outlets
            RouteOutlet.objects.filter(
                route=route
            ).exclude(outlet_id__in=outlet_ids).delete()

            # Refresh route from database
            route.refresh_from_db()
            return Response(self.get_serializer(route).data)

        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
    
    @action(detail=True, methods=['POST'], url_path='resend-email')
    def resend_email(self, request, pk=None):
        try:
            route = self.get_object()

            if not route.merchandiser:
                return Response(
                    {'error': 'No merchandiser assigned to this route'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Resend Email
            send_route_email(route.merchandiser, route)

            return Response(
                {'message': 'Email resent successfully'},
                status=status.HTTP_200_OK
            )
        
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

# class RouteGeoView(APIView):
#     def get(self, request, pk):
#         route = get_object_or_404(Route, pk=pk)
#         outlets = Outlet.objects.filter(routeoutlet__route=route)
#         geojson = Serializer().serialize(outlets, geometry_field='location')
#         return Response(json.loads(geojson))