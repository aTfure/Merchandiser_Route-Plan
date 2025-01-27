from django.contrib import admin
from outlets.models import Outlet, ChannelType


admin.site.register(Outlet)
class OutletAdmin(admin.ModelAdmin):
    list_display = ('id', 'outlet')


admin.site.register(ChannelType)
class ChannelTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'channel_type')