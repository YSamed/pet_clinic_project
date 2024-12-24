from django.contrib import admin
from .models import CustomUser

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_active')
    search_fields = ['username', 'email'] 
    list_filter = ['is_active']  
    ordering = ['username']  

admin.site.register(CustomUser, CustomUserAdmin)
