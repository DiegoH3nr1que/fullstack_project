from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.text import slugify

class Game(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    background_image = models.URLField(null=True, blank=True)

    # Informações básicas
    released = models.DateField(null=True, blank=True)
    rating = models.FloatField(null=True, blank=True)
    ratings_count = models.IntegerField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)

    # Plataformas e Gêneros (como listas de strings)
    platforms = models.JSONField(null=True, blank=True)
    genres = models.JSONField(null=True, blank=True)

    # Outras informações
    developers = models.JSONField(null=True, blank=True)
    publishers = models.JSONField(null=True, blank=True)
    esrb_rating = models.CharField(max_length=50, null=True, blank=True)
    playtime = models.IntegerField(null=True, blank=True)
    suggestions_count = models.IntegerField(null=True, blank=True)

    def save(self, args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(args, **kwargs)

    def str(self):
        return self.name


class Review(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    text = models.TextField(blank=True)

    def str(self):
        return f"Review for {self.game.name} ({self.rating} stars)"