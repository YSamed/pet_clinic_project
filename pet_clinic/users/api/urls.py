from rest_framework.routers import DefaultRouter
from users.api.views import CustomUserViewSet

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)

urlpatterns = router.urls