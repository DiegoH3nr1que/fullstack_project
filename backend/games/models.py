from django.db import models

class Jogo(models.Model):
    nome = models.CharField(max_length=255, unique=True)  # Unique para evitar duplicatas
    sumario = models.TextField(blank=True, null=True)
    capa = models.CharField(max_length=255, blank=True, null=True)  # ID da imagem da capa
    generos = models.CharField(max_length=255, blank=True, null=True)
    plataformas = models.CharField(max_length=255, blank=True, null=True)
    aggregated_rating = models.FloatField(null=True, blank=True)  # Campo para o rating

    def __str__(self):
        return self.nome
