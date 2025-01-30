from django.contrib import admin
from merchandisers.models import Merchandiser
from outlets.models import Outlet


class BaseAdminMixin:
    def full_name(self, obj):
        return obj.full_name()
    full_name.short_description = 'Full Name'
    
@admin.register(Merchandiser)
class MerchandiserAdmin(BaseAdminMixin, admin.ModelAdmin):
    
    list_display = ('id', 'full_name', 'email', 'phone_number', 'created')
    list_display_links = ('full_name',)


    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('assigned_outlets')
    
    def assigned_outlet_count(self, obj):
        return obj.assigned_outlets.count()
    assigned_outlet_count.short_description = 'Assigned Outlets'


class OutletInline(admin.TabularInline):
    model = Outlet
    fields = ('name', 'location', 'channel_type', 'assigned_date')
    extra = 0
    verbose_name = 'Assigned Outlet'
    verbose_name_plural = 'Assigned Outlets'

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('channel_type')