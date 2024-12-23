from django.urls import path, include

urlpatterns = [
    path('clinic/', include('clinic.api.urls')),
]
