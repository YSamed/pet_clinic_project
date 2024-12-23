from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True, unique=True)
    profile_picture = models.ImageField(upload_to='img/', null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


