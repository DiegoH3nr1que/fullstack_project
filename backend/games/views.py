import requests
from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from .models import Review, Game
from .serializers import ReviewSerializer
from django.utils.text import slugify
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .models import Game, Review
from .utils import fetch_and_save_game_details
from rest_framework import serializers


def fetch_games(request):
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'  # Substitua pela sua chave de API RAWG
    url = f'https://api.rawg.io/api/games?key={api_key}'

    try:
        response = requests.get(url)
        response.raise_for_status() 
        data = response.json()

        # Extrair todas as informações necessárias
        games_info = []
        for game in data['results']:
            if 'background_image' in game:
                games_info.append({
                    'name': game['name'],
                    'background_image': game['background_image'],
                    'released': game['released'],
                    'rating': game['rating'],
                    'slug': game['slug']  # Obtendo o slug da API Rawg
                })

        return JsonResponse(games_info, safe=False) 

    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API: {e}")
        return JsonResponse({'error': 'Erro ao buscar jogos da API'}, status=500)

def game_detail(request, game_slug):
    print(f"Buscando detalhes do jogo com slug: {game_slug}")

    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'
    url = f'https://api.rawg.io/api/games/{game_slug}?key={api_key}'
    try:
        response = requests.get(url)
        response.raise_for_status()
        game = response.json()

        # Verifica se o jogo foi encontrado
        if 'detail' in game and game['detail'] == 'Not found.':
            return JsonResponse({'error': 'Jogo não encontrado'}, status=404)

        # Adiciona as reviews do banco de dados ao JSON de resposta
        game_instance = Game.objects.filter(slug=game_slug).first()
        if game_instance:
            reviews = Review.objects.filter(game=game_instance)
            reviews_serializer = ReviewSerializer(reviews, many=True)
            game['reviews'] = reviews_serializer.data
        else:
            game['reviews'] = []

        return JsonResponse(game)

    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API: {e}")
        return JsonResponse({'error': 'Erro ao buscar detalhes do jogo da API'}, status=500)


def search_api(request):
    query = request.GET.get('q', '')
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'  # Substitua pela sua chave de API RAWG
    url = f'https://api.rawg.io/api/games?key={api_key}&search={query}'
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        return JsonResponse(data)  # Retorna os dados brutos da API

    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API: {e}")
        return JsonResponse({'error': 'Erro ao buscar jogos da API'}, status=500)
    
class ReviewCreateView(generics.ListCreateAPIView):  
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        game_slug = self.kwargs.get('slug')
        return Review.objects.filter(game__slug=game_slug)  

    def perform_create(self, serializer):
        game_slug = self.kwargs.get('slug')
        try:
            game = Game.objects.get(slug=game_slug)
        except Game.DoesNotExist:
            game = fetch_and_save_game_details(game_slug)
        serializer.save(game=game)

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST) 
        

def featured_games(request):
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'  # Sua chave de API RAWG
    base_url = "https://api.rawg.io/api/games"
    params = {
        "key": api_key,
        "dates": "2023-01-01,2024-01-01",  # Período dos jogos em destaque
        "ordering": "-added",  # Ordenar por data de adição (mais recentes primeiro)
    }

    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()  # Verificar se a requisição foi bem-sucedida
        data = response.json()

        featured_games_info = []
        for game in data['results']:
            featured_games_info.append({
                'name': game['name'],
                'background_image': game.get('background_image', ''),
                'released': game['released'],
                'rating': game['rating']
            })

        return JsonResponse(featured_games_info, safe=False)

    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API RAWG: {e}")
        return JsonResponse({'error': 'Erro ao buscar jogos da API'}, status=500)


def popular_games(request):
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'  # Sua chave de API RAWG
    dates = '2023-01-01,2023-12-31'  # Período dos jogos de 2023
    ordering = '-rating'  # Ordenar por rating (os melhores primeiro)
    url = f'https://api.rawg.io/api/games?key={api_key}&dates={dates}&ordering={ordering}'

    try:
        response = requests.get(url)
        response.raise_for_status()  # Verificar se a requisição foi bem-sucedida
        data = response.json()

        popular_games_info = []
        for game in data['results']:
            popular_games_info.append({
                'slug': game['slug'],  # Adiciona o slug do jogo
                'name': game['name'],
                'background_image': game.get('background_image', ''),
                'released': game['released'],
                'rating': game['rating']
            })

        return JsonResponse(popular_games_info, safe=False)

    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API RAWG: {e}")
        return JsonResponse({'error': 'Erro ao buscar jogos da API'}, status=500)
 


def upcoming_games(request):
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'  
    dates = request.GET.get('dates', '2024-07-01,2024-12-31') 
    ordering = request.GET.get('ordering', '-added')
    url = f'https://api.rawg.io/api/games?key={api_key}&dates={dates}&ordering={ordering}' 

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        upcoming_games_info = []
        for game in data['results']:
            upcoming_games_info.append({
                'slug': game['slug'],
                'name': game['name'],
                'background_image': game.get('background_image', ''),
                'released': game['released'],
                'rating': game['rating']
            })

        return JsonResponse(upcoming_games_info, safe=False) 

    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API: {e}")
        return JsonResponse({'error': 'Erro ao buscar jogos da API'}, status=500)