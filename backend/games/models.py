from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Game(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    rating = models.FloatField(null=True, blank=True)
    background_image = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.name

class Review(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    text = models.TextField(blank=True)

    def __str__(self):
        return f"Review for {self.game.name} ({self.rating} stars)"
