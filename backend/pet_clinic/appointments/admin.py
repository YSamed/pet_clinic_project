from django.contrib import admin
from .models import Appointment, AppointmentTime

@admin.register(AppointmentTime)
class AppointmentTimemeAdmin(admin.ModelAdmin):
    list_display = ['time']
    ordering = ['time']

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['animal', 'date', 'time', 'status'] 
    list_filter = ['status', 'date']  
    ordering = ['date', 'time']  
    search_fields = ['animal__name']
