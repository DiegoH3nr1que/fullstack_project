import requests
from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from .models import Game, Review

def fetch_games(request):
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'
    url = f'https://api.rawg.io/api/games?key={api_key}'

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        for game_data in data['results']:
            game, created = Game.objects.get_or_create(slug=game_data['slug'])
            game.name = game_data['name']
            game.rating = game_data.get('rating')
            game.background_image = game_data.get('background_image')
            game.save()
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API: {e}")
        return render(request, 'games/error.html', {'error_message': 'Erro ao buscar jogos da API'})

    return render(request, 'games/search_results.html', {'games': Game.objects.all()})

def search_api(request):
    query = request.GET.get('q', '')
    api_key = 'e4c06793c5804f288d80ad5c6bf9684f'
    url = f'https://api.rawg.io/api/games?key={api_key}&search={query}'

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        formatted_results = [
            {
                'name': game['name'],
                'slug': game['slug'],
                'background_image': game['background_image'],
            }
            for game in data['results']
        ]
        return render(request, 'games/search_results.html', {'games': formatted_results})
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API: {e}")
        return render(request, 'games/error.html', {'error_message': 'Erro ao buscar jogos da API'})

def game_detail(request, game_slug):
    game = get_object_or_404(Game, slug=game_slug)
    return render(request, 'games/game_detail.html', {'game': game})

def create_review(request, game_slug):
    if request.method == 'POST':
        game = get_object_or_404(Game, slug=game_slug)
        rating = int(request.POST.get('rating'))
        text = request.POST.get('text')

        review = Review(game=game, rating=rating, text=text)
        review.save()

        return JsonResponse({
            'rating': review.rating,
            'text': review.text,
        })
