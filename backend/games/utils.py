import requests
from .models import Game

def fetch_and_save_game_details(slug):
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'
    url = f'https://api.rawg.io/api/games/{slug}?key={api_key}'
    response = requests.get(url)
    response.raise_for_status()
    game_data = response.json()

    game, created = Game.objects.update_or_create(
        slug=slug,
        defaults={
            'name': game_data['name'],
            'background_image': game_data['background_image'],
            'released': game_data['released'],
            'rating': game_data['rating'],
        }
    )
    return game