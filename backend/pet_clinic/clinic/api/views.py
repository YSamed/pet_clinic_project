from rest_framework import viewsets
from clinic.models import Animal,AnimalType
from .serializers import AnimalSerializer, AnimalTypeSerializer
from rest_framework.permissions import IsAuthenticated


class AnimalTypeViewSet(viewsets.ModelViewSet):
    queryset = AnimalType.objects.all()
    serializer_class = AnimalTypeSerializer

    def get_queryset(self):
        user = self.request.user
        return Animal.objects.filter(owner=user)


class AnimalViewSet(viewsets.ModelViewSet):
    serializer_class = AnimalSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        user = self.request.user
        return Animal.objects.filter(owner=user)