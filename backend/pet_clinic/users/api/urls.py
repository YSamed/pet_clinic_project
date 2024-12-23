from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import CustomUserViewSet

# Router ile viewset'i kaydediyoruz
router = DefaultRouter()
router.register(r'users', CustomUserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),  
]
