from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),


    path('admin/', admin.site.urls), 
    
    path('clinic/', include('clinic.api.urls')),
    path('health/', include('health.api.urls')),
    path('appointments/', include('appointments.api.urls')),
    path('users/', include('users.api.urls')),
    path('custom_auth/', include('custom_auth.api.urls')),
]

# Medya dosyalarının doğru şekilde sunulması
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
