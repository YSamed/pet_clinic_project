from django.db import models
from clinic.models import Animal

# Create your models here.


class TreatmentCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class HealthRecord(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE, related_name="health_records")
    visit_date = models.DateField()
    categories = models.ManyToManyField(TreatmentCategory, related_name="health_records")
    description = models.TextField()
    next_visit = models.DateField(blank=True, null=True)

    def __str__(self):
        categories = ", ".join([cat.name for cat in self.categories.all()])
        return f"{self.animal.name} - {self.visit_date} ({categories})"

    
