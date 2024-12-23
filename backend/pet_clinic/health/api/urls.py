from rest_framework.routers import DefaultRouter
from health.api.views import TreatmentCategoryViewSet, HealthRecordViewSet

router = DefaultRouter()
router.register(r'treatment-categories', TreatmentCategoryViewSet, basename='treatmentcategory')
router.register(r'health-records', HealthRecordViewSet, basename='healthrecord')

urlpatterns = router.urls