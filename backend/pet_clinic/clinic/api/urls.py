from rest_framework.routers import DefaultRouter
from .views import AnimalViewSet, AnimalTypeViewSet

# Router tanımı
router = DefaultRouter()
router.register(r'animals', AnimalViewSet, basename='animal')
router.register(r'animal-types', AnimalTypeViewSet, basename='animaltype')

# Router URL'lerini urlpatterns'e ekle
urlpatterns = router.urls
