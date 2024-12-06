from rest_framework import viewsets
from clinic.models import Animal, Owner, AnimalType
from .serializers import AnimalSerializer, OwnerSerializer, AnimalTypeSerializer


class OwnerViewSet(viewsets.ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer

class AnimalTypeViewSet(viewsets.ModelViewSet):
    queryset = AnimalType.objects.all()
    serializer_class = AnimalTypeSerializer

class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

    def perform_create(self, serializer):
        serializer.save(status='pending')

