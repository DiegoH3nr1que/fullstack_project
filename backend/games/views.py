import requests
from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from .models import Review, Game
from .serializers import ReviewSerializer

def fetch_games(request):
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'  
    url = f'https://api.rawg.io/api/games?key={api_key}'

    try:
        response = requests.get(url)
        response.raise_for_status() 
        data = response.json()

        
        games_info = []
        for game in data['results']:
            if 'background_image' in game:
                games_info.append({
                    'name': game['name'],
                    'background_image': game['background_image'],
                    'released': game['released'],
                    'rating': game['rating']
                })

        return JsonResponse(games_info, safe=False) 

    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API: {e}")
        return JsonResponse({'error': 'Erro ao buscar jogos da API'}, status=500)

def search_api(request):
    query = request.GET.get('q', '')
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'  
    url = f'https://api.rawg.io/api/games?key={api_key}&search={query}'
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        return JsonResponse(data)  

    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API: {e}")
        return JsonResponse({'error': 'Erro ao buscar jogos da API'}, status=500)

def game_detail(request, game_slug):
    print(f"Buscando detalhes do jogo: {game_slug}")
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'
    url = f'https://api.rawg.io/api/games/{game_slug}?key={api_key}'
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return JsonResponse(data)
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API: {e}")
        return JsonResponse({'error': 'Erro ao buscar detalhes do jogo da API'}, status=500)

class GameViewSet(viewsets.ReadOnlyModelViewSet):
    # ... outras actions

    @action(detail=True, methods=['post'], url_path='reviews/(?P<game_slug>[^/.]+)') 
    def reviews(self, request, game_slug=None): 
        try:
            game = Game.objects.get(slug=game_slug)
        except Game.DoesNotExist:
            return Response({'error': 'Game not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(game=game)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
@api_view(['POST'])
def create_review(request, game_slug):
    try:
        game = Game.objects.get(slug=game_slug)
    except Game.DoesNotExist:
        return Response({'error': 'Game not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(game=game)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def featured_games(request):
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'  
    base_url = "https://api.rawg.io/api/games"
    params = {
        "key": api_key,
        "dates": "2023-01-01,2024-01-01",  
        "ordering": "-added",  
    }

    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()  
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
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'
    page_size = request.GET.get('page_size', 10)  
    url = f'https://api.rawg.io/api/games?key={api_key}&page_size={page_size}' 

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        games_info = []  
        for game in data['results']:
            if 'background_image' in game:
                games_info.append({
                    'name': game['name'],
                    'background_image': game['background_image'],
                    'released': game['released'],
                    'rating': game['rating']
                })

        return JsonResponse(games_info, safe=False)  

    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API: {e}")
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
                'name': game['name'],
                'background_image': game.get('background_image', ''),
                'released': game['released'],
                'rating': game['rating']
            })

        return JsonResponse(upcoming_games_info, safe=False) 

    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API: {e}")
        return JsonResponse({'error': 'Erro ao buscar jogos da API'}, status=500)