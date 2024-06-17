from django.urls import path
from . import views

urlpatterns = [
    path('games/', views.fetch_games, name='fetch_games'),
    path('search/', views.search_api, name='search_api'),
    path('details/<slug:game_slug>/', views.game_detail, name='game_detail'),
    path('details/<slug:game_slug>/reviews/', views.create_review, name='create_review'),
    path('upcoming_games/', views.upcoming_games, name='upcoming_games'),
    path('popular_games/', views.popular_games, name='popular_games'),
    path('destaques/', views.featured_games, name='featured_games'),
]