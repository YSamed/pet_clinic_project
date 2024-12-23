from django.db import models
from users.models import CustomUser

# Create your models here.

class AnimalType(models.Model):
    name = models.CharField(max_length=100,unique=True)
    description = models.TextField(blank=True, null=True) 

    def __str__(self):
        return self.name
    
class Animal(models.Model):
    name = models.CharField(max_length=100)
    animal_type = models.ForeignKey(AnimalType, on_delete=models.CASCADE)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    animal_picture = models.ImageField(upload_to='img/', null=True, blank=True)
    birth_date = models.DateField()

    def __str__(self):
        return self.name
    


    
