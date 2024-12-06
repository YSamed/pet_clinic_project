from django.contrib import admin
from clinic.models import Owner, AnimalType, Animal

# Register your models here.

admin.site.register(Owner)
admin.site.register(AnimalType)
admin.site.register(Animal)
