from django.contrib import admin
from clinic.models import AnimalType, Animal

# Register your models here.

admin.site.register(AnimalType)


@admin.register(Animal)
class AnimalAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']