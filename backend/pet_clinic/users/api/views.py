from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from .serializers import CustomUserSerializer
from ..models import  CustomUser


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return CustomUser.objects.filter(id=self.request.user.id)


