from rest_framework import viewsets
from health.models import TreatmentCategory, HealthRecord
from health.api.serializers import TreatmentCategorySerializer, HealthRecordSerializer


class TreatmentCategoryViewSet(viewsets.ModelViewSet):
    queryset = TreatmentCategory.objects.all()
    serializer_class = TreatmentCategorySerializer


class HealthRecordViewSet(viewsets.ModelViewSet):
    queryset = HealthRecord.objects.all()
    serializer_class = HealthRecordSerializer
