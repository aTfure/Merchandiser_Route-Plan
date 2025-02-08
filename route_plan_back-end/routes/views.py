from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from routes.models import Route, RouteSchedule
from routes.api.serializers import RouteSerializer, RouteScheduleSerializer
from services.email_service import  send_schedule_notification

class RouteViewSet(viewsets.ModelViewSet):
    queryset = Route.objects.prefetch_related('route_outlets__outlet')
    serializer_class = RouteSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        route = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @action(detail=True, methods=['POST'])
    def add_outlets(self, request, pk=None):
        try:
            route = self.get_object()
            outlet_ids = request.data.get('outlet_ids', [])
            serializer = self.get_serializer(route, data={'outlet_ids': outlet_ids}, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RouteScheduleViewSet(viewsets.ModelViewSet):
    queryset = RouteSchedule.objects.all()
    serializer_class = RouteScheduleSerializer

    def perform_create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            route_schedule = serializer.save()
            send_schedule_notification(route_schedule)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def perform_update(self, request, pk=None):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            route_schedule = serializer.save()
            send_schedule_notification(route_schedule)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    @action(detail=True, methods=['POST'], url_path='resend-email')
    def resend_email(self, request, pk=None):
        try:
            schedule = self.get_object()
            route = schedule.route

            if not route.merchandiser or not route.merchandser.email:
                return Response(
                    {'error': 'No merchandiser assigned to this route'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Resend Email
            send_schedule_notification(schedule)

            return Response(
                {'message': 'Email resent successfully'},
                status=status.HTTP_200_OK
            )
        
        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class RouteScheduleList(generics.ListCreateAPIView):
    queryset = RouteSchedule.objects.all()
    serializer_class = RouteScheduleSerializer

class RouteScheduleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = RouteSchedule.objects.all()
    serializer_class = RouteScheduleSerializer
