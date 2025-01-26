from django.contrib import admin
from merchandisers.models import Merchandiser, OutletMerchandiser


class BaseAdminMixin:
    def full_name(self, obj):
        return obj.full_name()
    full_name.short_description = 'Full Name'
    
@admin.register(Merchandiser)
class MerchandiserAdmin(BaseAdminMixin, admin.ModelAdmin):
    
    list_display = ('id', 'full_name', 'email', 'phone_number', 'created')
    list_display_links = ('full_name',)

@admin.register(OutletMerchandiser)
class OutletMerchandiserAdmin(BaseAdminMixin, admin.ModelAdmin):
    def get_list_display(self, request):
        if 'merchandiser_id_exact' in request.GET:
            return ['id', 'manager', 'date_time', 'outlet', 'channel_type']
        return ['id', 'merchandiser']
    
    list_display_links = ('merchandiser',)