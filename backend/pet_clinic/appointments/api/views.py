from rest_framework import viewsets
from appointments.models import Appointment, AppointmentTime
from .serializers import AppointmentSerializer, AppointmentTimeSerializer


class AppointmentTimeViewSet(viewsets.ModelViewSet):
    queryset = AppointmentTime.objects.all()
    serializer_class = AppointmentTimeSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def perform_create(self, serializer):
        serializer.save()



