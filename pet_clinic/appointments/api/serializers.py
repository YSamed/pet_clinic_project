from rest_framework import serializers
from clinic.models import Animal
from appointments.models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):
    animal = serializers.PrimaryKeyRelatedField(queryset=Animal.objects.all())  

    class Meta:
        model = Appointment
        fields = ['id', 'animal', 'date_time']
        read_only_fields = ['id']
