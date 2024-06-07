from rest_framework import serializers
from .models import Game

class JogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '_all'