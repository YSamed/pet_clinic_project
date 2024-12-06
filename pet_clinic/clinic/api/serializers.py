from rest_framework import serializers
from clinic.models import Owner, Animal, AnimalType
from datetime import date


class AnimalTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimalType
        fields = ['id', 'name', 'description']

class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = ['id', 'name', 'animal_type', 'owner', 'birth_date', 'status']
        read_only_fields = ['status'] 

    def validate_birth_date(self, value):
        if value > date.today():
            raise serializers.ValidationError("Doğum tarihi gelecekte olamaz.")
        return value


class OwnerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Owner
        fields = ['id', 'name', 'surname', 'email', 'phone_number']
