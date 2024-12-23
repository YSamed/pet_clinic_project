from rest_framework import serializers
from clinic.models import Animal  
from health.models import TreatmentCategory, HealthRecord


# TreatmentCategory Serializer
class TreatmentCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TreatmentCategory
        fields = ['id', 'name', 'description']


# HealthRecord Serializer
class HealthRecordSerializer(serializers.ModelSerializer):
    # Animal bilgilerini göstermek için nested serializer veya ID seçeneği
    animal = serializers.PrimaryKeyRelatedField(queryset=Animal.objects.all())
    # TreatmentCategory için Many-to-Many ilişki
    categories = TreatmentCategorySerializer(many=True)

    class Meta:
        model = HealthRecord
        fields = ['id', 'animal', 'visit_date', 'categories', 'description', 'next_visit']

    def create(self, validated_data):
        """
        HealthRecord oluşturulurken Many-to-Many alanı özel olarak işlenir.
        """
        categories_data = validated_data.pop('categories')
        health_record = HealthRecord.objects.create(**validated_data)

        # Many-to-Many alanını doldur
        for category_data in categories_data:
            category, created = TreatmentCategory.objects.get_or_create(**category_data)
            health_record.categories.add(category)

        return health_record
