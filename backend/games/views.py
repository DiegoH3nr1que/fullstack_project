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
    pass

def create_review(request, game_slug):
    pass
