from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from outlets.models import Outlet, ChannelType
from merchandisers.models import Merchandiser, OutletMerchandiser



class Command(BaseCommand):
    help = 'Create default groups and permissions'


    def handle(self, *args, **kwargs):
        # Define group permissions
        admin_permissions = [
            # Outlet permissions
            ('view_outlet', Outlet),
            ('add_outlet', Outlet),
            ('change_outlet', Outlet),
            ('delete_outlet', Outlet),

            # ChannelType permissions
            ('view_channeltype', ChannelType),
            ('add_channeltype', ChannelType),
            ('change_channeltype', ChannelType),
            ('delete_channeltype', ChannelType),

            # Merchandiser permissions
            ('view_merchandiser', Merchandiser),
            ('add_merchandiser', Merchandiser),
            ('change_merchandiser', Merchandiser),
            ('delete_merchandiser', Merchandiser),

        ]

        manager_permissions = [
            ('view_outlet', Outlet),
            ('change_outlet', Outlet),
            ('view_merchandiser', Merchandiser),
            ('change_merchandiser', Merchandiser),
            ('view_outletmerchandiser', OutletMerchandiser),
            ('add_outletmerchandiser', OutletMerchandiser),
            ('change_outletmerchandiser', OutletMerchandiser),
        ]

        # Create group
        groups = {
        'Administrator': admin_permissions,
        'Manager': manager_permissions,
        }

        for group_name, permissions in groups.items():
            group, created = Group.objects.get_or_create(name=group_name)
            for perm_codename, model_class in permissions:
                content_type = ContentType.objects.get_for_model(model_class)
                permission = Permission.objects.get(
                    codename = perm_codename,
                    content_type = content_type
                )
                group.permissions.add(permission)

            self.stdout.write(f'Successfully set up {group_name} group')    
