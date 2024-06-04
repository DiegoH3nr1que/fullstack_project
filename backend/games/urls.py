from django.urls import path
from .views import fetch_games, search_api, game_detail, create_review

urlpatterns = [
    path('', fetch_games, name='fetch_games'),
    path('api/search/', search_api, name='search_api'),
    path('<slug:game_slug>/', game_detail, name='game_detail'),
    path('create_review/<slug:game_slug>/', create_review, name='create_review'),
]
