# games/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('famosos/', views.jogos_famosos, name='jogos_famosos'),
    path('aleatorios/', views.jogos_aleatorios, name='jogos_aleatorios'),
    path('bem-avaliados/', views.jogos_bem_avaliados, name='jogos_bem_avaliados'),
]
