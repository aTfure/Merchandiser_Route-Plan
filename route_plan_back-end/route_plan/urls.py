"""
URL configuration for route_plan project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import LoginView
from merchandisers.views import MerchandiserViewSet
from outlets.views import OutletViewSet, ChannelTypeViewSet, OutletMapViewSet
from routes.views import RouteViewSet, RouteScheduleViewSet, RouteScheduleList, RouteScheduleDetail
from rest_framework import routers




router = DefaultRouter()
router.register(r'outlets', OutletViewSet)
router.register(r'channel-types', ChannelTypeViewSet)
router.register(r'merchandisers', MerchandiserViewSet)
router.register(r'routes', RouteViewSet, basename='route')
router.register(r'route-schedules', RouteScheduleViewSet, basename='route-schedule')
router.register(r'map-outlets', OutletMapViewSet, basename='map-outlets')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('api/auth', include('rest_framework.urls')),
    path('api/', include(router.urls)),
]
