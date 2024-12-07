from rest_framework import viewsets
from appointments.models import Appointment
from .serializers import AppointmentSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def perform_create(self, serializer):
        # Randevu kaydedilirken, 'status' otomatik olarak 'pending' olarak ayarlanır
        serializer.save(status='pending')
