from rest_framework import serializers
from appointments.models import AppointmentTime, Appointment
from clinic.models import Animal

#Randevu zamanı için serializer
class AppointmentTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentTime
        fields = ['id', 'time']

#Randevu için serializer
class AppointmentSerializer(serializers.ModelSerializer):
    animal = serializers.PrimaryKeyRelatedField(queryset=Animal.objects.all())  # modelleri birer id olarak temsil eder
    time = serializers.PrimaryKeyRelatedField(queryset=AppointmentTime.objects.all()) 

    class Meta:
        model = Appointment
        fields = ['id', 'animal', 'date', 'time', 'status']

    def create(self, validated_data):
        animal = validated_data.pop('animal')
        time = validated_data.pop('time')
        animal_instance = Animal.objects.get(id=animal.id)
        time_instance = AppointmentTime.objects.get(id=time.id)
        if Appointment.objects.filter(date=validated_data['date'], time=time_instance).exists():
            raise serializers.ValidationError("Bu saate sahip randevu zaten mevcut.")
        appointment = Appointment.objects.create(animal=animal_instance, time=time_instance, **validated_data)
        return appointment


