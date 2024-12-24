from django.db import models
from clinic.models import Animal
from django.core.exceptions import ValidationError
from django.utils.timezone import now

#Randevu Saati Modeli
class AppointmentTime(models.Model):
    time = models.TimeField(unique=True)

    def __str__(self):
        return self.time.strftime("%H:%M")

#Randevu Modeli
class Appointment(models.Model):
    STATUS_CHOICES = [('pending', 'Pending'),('confirmed', 'Confirmed'),('canceled', 'Canceled'),]
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE, related_name="appointments")
    date = models.DateField()
    time = models.ForeignKey(AppointmentTime, on_delete=models.CASCADE, related_name="appointments")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    def clean(self):
        if self.date < now().date():
            raise ValidationError("Randevu tarihi geçmişte olamaz.")

    def __str__(self):
        return f"{self.animal.name} - {self.date} {self.time} - {self.get_status_display()}"

