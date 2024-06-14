import requests
from django.http import JsonResponse

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
                    'rating': game['rating']
                })

        return JsonResponse(games_info, safe=False)  # Retorna a lista de informações dos jogos

    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API: {e}")
        return JsonResponse({'error': 'Erro ao buscar jogos da API'}, status=500)

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
    pass

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