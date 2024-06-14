import requests

def get_game_info(game_slug):
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'  # Substitua pela sua chave de API RAWG
    base_url = 'https://api.rawg.io/api/games'
    url = f'{base_url}/{game_slug}?key={api_key}'

    try:
        response = requests.get(url)
        response.raise_for_status()  # Verifica se a requisição foi bem-sucedida
        data = response.json()
        return data  # Retorna todos os dados do jogo

    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API: {e}")
        return None  # Retorna None em caso de erro