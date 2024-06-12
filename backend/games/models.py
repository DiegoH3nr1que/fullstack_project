from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.text import slugify

class Game(models.Model):
    CATEGORY_CHOICES = [
        ('popular', 'Popular'),
        ('recent', 'Lançamento Recente'),
        ('top_rated', 'Melhor Avaliado'),
    ]
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES, default='popular') 
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    background_image = models.URLField(null=True, blank=True)
    released = models.DateField(null=True, blank=True)
    rating = models.FloatField(null=True, blank=True)
    ratings_count = models.IntegerField(null=True, blank=True)
    genres = models.JSONField(null=True, blank=True)
    platforms = models.JSONField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Review(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    text = models.TextField(blank=True)
     # Adicione um campo para a data de criação

    def __str__(self):
        return f"Review for {self.game.name} ({self.rating} stars)"
