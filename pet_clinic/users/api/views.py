from rest_framework import viewsets
from users.models import CustomUser
from users.api.serializers import CustomUserSerializer
from .serializers import CustomUserSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
