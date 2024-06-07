from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('games/', include('games.urls')),  # Inclui as URLs do app games
    path('user/', include('user.urls')), 
]
