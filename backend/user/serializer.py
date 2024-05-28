from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=30, allow_blank=True)
    last_name = serializers.CharField(max_length=30, allow_blank=True)
    date_of_birth = serializers.DateField(allow_null=True)
    bio = serializers.CharField(max_length=500, allow_blank=True)
    is_active = serializers.BooleanField(default=True)
    is_staff = serializers.BooleanField(default=False)
    date_joined = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return CustomUser(**validated_data)
