from rest_framework import serializers
from .models import Game, Review

class JogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__' 

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'rating', 'text']