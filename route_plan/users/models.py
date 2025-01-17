from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Contact Info
    """
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    contact_type = models.CharField(max_length=50)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name','phone']

    class Meta:
        db_table = 'contact_info'


class UserProfile(models.Model):
    """
    Profile informations for User(Manager)
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')


    class Meta:
        db_table = 'users_profiles'
    
    def __str__(self):
        return self.user.email
