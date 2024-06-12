import requests
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets, permissions
from .models import Game, Review
from .serializers import Game
from django.utils.text import slugify

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = Game
    permission_classes = [permissions.AllowAny]  # Adjust permissions as needed


def fetch_games(request):
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'  # Substitua pela sua chave de API
    endpoints = {
        'popular_games': f'https://api.rawg.io/api/games?key={api_key}&ordering=-added',
        'recent_releases': f'https://api.rawg.io/api/games?key={api_key}&dates=2023-06-12,2024-06-12&ordering=-released',
        'top_rated_games': f'https://api.rawg.io/api/games?key={api_key}&ordering=-rating'
    }

    try:
        responses = {category: requests.get(url) for category, url in endpoints.items()}
        for response in responses.values():
            response.raise_for_status()

        game_data = {}
        for category, response in responses.items():
            data = response.json()
            for game_info in data['results']:
                game, created = Game.objects.get_or_create(name=game_info['name'], defaults={
                    'slug': slugify(game_info['name']),
                    'background_image': game_info.get('background_image'),
                    'released': game_info.get('released'),
                    'rating': game_info.get('rating'),
                    'ratings_count': game_info.get('ratings_count', 0),
                    'genres': [genre['name'] for genre in game_info.get('genres', [])],
                    'platforms': [platform['platform']['name'] for platform in game_info.get('platforms', [])],
                    'category': category  # Adiciona a categoria
                })

                # Adiciona o jogo à lista da categoria correspondente
                game_data.setdefault(category, []).append(game)

        return render(request, 'games/search_results.html', game_data)

    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar dados da API: {e}")
        return JsonResponse({'error': 'Erro ao buscar jogos da API'}, status=500)


def search_api(request):
    query = request.GET.get('q', '')
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'  # Substitua pela sua chave de API RAWG
    url = f'https://api.rawg.io/api/games?key={api_key}&search={query}'

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        formatted_results = [
            {
                'name': game['name'],
                'slug': game['slug'],
                # ... (other fields you want to return)
            }
            for game in data['results']
        ]

        return JsonResponse({'results': formatted_results})
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API: {e}")
        return JsonResponse({'error': 'Erro ao buscar jogos da API'}, status=500)

def game_detail(request, game_slug):
    # ... (Fetch game details from RAWG API)
    # Assuming you have fetched game_details as a dictionary
    return JsonResponse(game_details)



def create_review(request, game_slug):
    if request.method == 'POST':
        # ... (logic to save review to database)
        return JsonResponse({'message': 'Review created successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)  # 400 Bad Request
