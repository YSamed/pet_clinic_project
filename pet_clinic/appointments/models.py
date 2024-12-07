from django.db import models
from clinic.models import Animal

# Create your models here.

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('canceled', 'Canceled'),
    ]

    animal = models.ForeignKey(Animal, on_delete=models.CASCADE, related_name="appointments")
    date_time = models.DateTimeField()  
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"{self.animal.name} - {self.date_time} - {self.status}"
