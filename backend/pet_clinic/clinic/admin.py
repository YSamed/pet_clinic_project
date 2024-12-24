from django.contrib import admin
from clinic.models import AnimalType, Animal


admin.site.register(AnimalType)

@admin.register(Animal)
class AnimalAdmin(admin.ModelAdmin):
    list_display = ['name', 'animal_type']
    search_fields = ['name', 'animal_type']  
    list_filter = ['animal_type']
    ordering = ['name']
    
  
