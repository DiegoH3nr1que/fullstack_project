from django.urls import path
from . import views

urlpatterns = [
    path('games/', views.fetch_games, name='fetch_games'),
    path('search/', views.search_api, name='search_api'),
    path('games/<slug:game_slug>/', views.game_detail, name='game_detail'),
    path('games/<slug:game_slug>/reviews/', views.create_review, name='create_review'),
    path('upcoming_games/', views.upcoming_games, name='upcoming_games'),
    path('popular_games/', views.popular_games, name='popular_games'),
    path('genres/', views.genres_list, name='genres_list'),
    path('genres/<slug:genre_slug>/', views.games_by_genre, name='games_by_genre'),
    path('platforms/', views.platforms_list, name='platforms_list'),
    path('platforms/<slug:platform_slug>/', views.games_by_platform, name='games_by_platform'),
    path('games/<slug:game_slug>/', views.game_detail, name='game_detail'),
    
]
