from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'full_name', 'phone_number']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def get_full_name(self, obj):
        return obj.get_full_name()
