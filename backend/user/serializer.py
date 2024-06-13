from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128)
    first_name = serializers.CharField(max_length=30, allow_blank=True)
    last_name = serializers.CharField(max_length=30, allow_blank=True)
    date_of_birth = serializers.DateField(allow_null=True)
    bio = serializers.CharField(max_length=500, allow_blank=True)
    is_active = serializers.BooleanField(default=True)
    is_staff = serializers.BooleanField(default=False)
    date_joined = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = CustomUser(**validated_data)
        if password is not None:
            instance.password = make_password(password)  # Use make_password para criar o hash da senha
        instance.save()
        return instance

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password is not None:
            instance.password = make_password(password)  # Use make_password para criar o hash da senha
        instance.save()
        return instance