from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed

#Giriş Yapma Serializerı 
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data): 
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password) #Kontrol işlemleri

        if user is None:
            raise AuthenticationFailed("Kullanıcı adı veya şifre yanlış.")
        if not user.is_active:
            raise AuthenticationFailed("Bu hesap aktif değil.")

        return {
            'user': user,
        }
