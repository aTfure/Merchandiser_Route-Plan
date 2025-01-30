from django.contrib import admin
from outlets.models import Outlet, ChannelType


admin.site.register(Outlet)
class OutletAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'channel_type', 'merchandiser', 'assigned_date')


    def get_queryset(self, request):
        return super().get_queryset(request).select_related('channel_type', 'merchandiser')


admin.site.register(ChannelType)
class ChannelTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)