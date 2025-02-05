from django.contrib import admin
from routes.models import Route, RouteOutlet

class RouteOutletInline(admin.TabularInline):
    model = RouteOutlet
    extra = 1
    autocomplete_fields = ['outlet']

admin.site.register(Route)
class RouteAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')
    search_fields = ['name']
    inlines = [RouteOutletInline]
    
    def outlet_count(self, obj):
        return obj.outlets.count()
    outlet_count.short_description = 'Outlets'