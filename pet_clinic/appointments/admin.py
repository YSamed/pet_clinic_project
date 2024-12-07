from django.contrib import admin
from .models import Appointment

class AppointmentAdmin(admin.ModelAdmin):
    # Admin panelinde görünen alanları belirliyoruz
    list_display = ('animal', 'date_time', 'status')

    # Alanlara göre filtreleme yapılacak alanları belirliyoruz
    list_filter = ('date_time', 'status', 'animal')

    # Arama yapılacak alanları belirliyoruz
    search_fields = ('animal__name', 'status')

    # Sıralama yapıyoruz (en son randevular üstte görünsün)
    ordering = ('-date_time',)  # Sonraki randevular en üstte görünsün

# Appointment modelini admin paneline kaydediyoruz
admin.site.register(Appointment, AppointmentAdmin)
