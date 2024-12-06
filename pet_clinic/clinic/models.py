from django.db import models

# Create your models here.

class Owner(models.Model):
    name = models.CharField(max_length=100 ,unique=True)
    surname = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=11)

    def __str__(self):
        return self.name
    

class AnimalType(models.Model):
    name = models.CharField(max_length=100,unique=True)
    description = models.TextField(blank=True, null=True) 

    def __str__(self):
        return self.name
    

class Animal(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Onay Bekliyor'),
        ('active', 'Aktif'), 
    ]
    name = models.CharField(max_length=100)
    animal_type = models.ForeignKey(AnimalType, on_delete=models.CASCADE)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    birth_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending') 


    def __str__(self):
        return self.name
    
