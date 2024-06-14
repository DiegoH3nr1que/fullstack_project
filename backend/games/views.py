import requests
from django.http import JsonResponse
from .utils import get_game_info

def fetch_games(request):
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'  # Substitua pela sua chave de API RAWG
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

    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API: {e}")
        return JsonResponse({'error': 'Erro ao buscar jogos da API'}, status=500)

def game_detail(request, game_slug):
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


def create_review(request, game_slug):
    # Lógica para criar um review (requer autenticação, modelo de Review, etc.)
    pass 

def genres_list(request):
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'  # Substitua pela sua chave de API RAWG
    url = f'https://api.rawg.io/api/genres?key={api_key}'

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return JsonResponse(data['results'], safe=False)
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API: {e}")
        return JsonResponse({'error': 'Erro ao buscar gêneros da API'}, status=500)

def games_by_genre(request, genre_slug):
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'  # Substitua pela sua chave de API RAWG
    page_size = request.GET.get('page_size', 10)
    url = f'https://api.rawg.io/api/games?key={api_key}&genres={genre_slug}&page_size={page_size}'

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
        return JsonResponse({'error': 'Erro ao buscar jogos por gênero da API'}, status=500)

def platforms_list(request):
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'  
    url = f'https://api.rawg.io/api/platforms?key={api_key}'

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        platforms_info = []
        for platform in data['results']:
            platforms_info.append({
                'id': platform['id'],
                'name': platform['name'],
                'slug': platform['slug'],
            })  

        return JsonResponse(platforms_info, safe=False)
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API: {e}")
        return JsonResponse({'error': 'Erro ao buscar plataformas da API'}, status=500)


def games_by_platform(request, platform_slug):
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'  # Substitua pela sua chave de API RAWG
    page_size = request.GET.get('page_size', 10)  # Personalize o número de jogos por página, se desejar
    url = f'https://api.rawg.io/api/games?key={api_key}&platforms={platform_slug}&page_size={page_size}'

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
        return JsonResponse({'error': 'Erro ao buscar jogos por plataforma da API'}, status=500)

def upcoming_games(request):
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'  
    dates = request.GET.get('dates', '2024-01-01,2024-12-31') 
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

def popular_games(request):
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'
    page_size = request.GET.get('page_size', 10)  
    url = f'https://api.rawg.io/api/games?key={api_key}&page_size={page_size}' 

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        games_info = []  # Reutiliza a mesma variável
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
    
def game_detail(request, game_slug):
    game_info = get_game_info(game_slug)

    if game_info:
        return JsonResponse(game_info)  # Retorna os dados do jogo como JSON
    else:
        return JsonResponse({'error': 'Jogo não encontrado'}, status=404)