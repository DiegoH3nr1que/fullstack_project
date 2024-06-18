from rest_framework import serializers
from .models import Game, Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'game', 'rating', 'text', 'date']
        read_only_fields = ['id', 'game', 'date']

class JogoSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    class Meta:
        model = Game
        fields = '__all__' 
