from rest_framework import serializers
from clinic.models import Animal, AnimalType
from datetime import date


class AnimalTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimalType
        fields = ['id','name']

class AnimalSerializer(serializers.ModelSerializer):
    animal_type = AnimalTypeSerializer()
    class Meta:
        model = Animal
        fields = ['id', 'name', 'animal_type', 'birth_date', 'animal_picture']

    def validate_birth_date(self, value):
        if value > date.today():
            raise serializers.ValidationError("Doğum tarihi gelecekte olamaz.")
        return value

