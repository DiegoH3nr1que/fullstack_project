from django.urls import path
from . import views
from .views import ReviewCreateView

urlpatterns = [
    path('games/', views.fetch_games, name='fetch_games'),
    path('search/', views.search_api, name='search_api'),
    path('details/<slug:game_slug>/', views.game_detail, name='game_detail'),
    path('games/details/<slug:slug>/reviews/', ReviewCreateView.as_view(), name='review-create'),
    path('upcoming_games/', views.upcoming_games, name='upcoming_games'),
    path('popular_games/', views.popular_games, name='popular_games'),
    path('destaques/', views.featured_games, name='featured_games'),
]