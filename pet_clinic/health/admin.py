from django.contrib import admin
from .models import HealthRecord, TreatmentCategory

# Register your models here.

@admin.register(HealthRecord)
class HealthRecordAdmin(admin.ModelAdmin):
    list_display = ("animal", "visit_date", "get_categories", "next_visit")

    def get_categories(self, obj):
        return ", ".join([cat.name for cat in obj.categories.all()])
    get_categories.short_description = "Categories"

admin.site.register(TreatmentCategory)
