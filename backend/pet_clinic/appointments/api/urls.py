from rest_framework.routers import DefaultRouter
from .views import AppointmentViewSet , AppointmentTimeViewSet

router = DefaultRouter()

# AppointmentViewSet'i kaydet
router.register(r'appointments', AppointmentViewSet, basename='appointment')
router.register(r'appointment-times', AppointmentTimeViewSet, basename='appointmenttime')



urlpatterns = router.urls
