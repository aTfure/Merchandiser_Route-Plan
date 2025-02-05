from django.contrib import admin
from outlets.models import Outlet, ChannelType

admin.site.register(Outlet)
class OutletAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'channel_type', 'merchandiser', 'assigned_date')
    search_fields = ['name', 'location', 'channel_type__name']
    list_filter = ('channel_type', 'assigned_date')
    autocomplete_fields = ['merchandiser']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('channel_type', 'merchandiser')

admin.site.register(ChannelType)
class ChannelTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ['name']