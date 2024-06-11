from rest_framework import serializers
from .models import Game #game

class JogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__' 