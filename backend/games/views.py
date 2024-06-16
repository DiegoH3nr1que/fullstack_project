import requests
import random
from django.http import JsonResponse
from django.conf import settings
from .models import Jogo
from django.core.paginator import Paginator
from django.db.models import F

def jogos_famosos(request):
    url = "https://api.igdb.com/v4/games"
    headers = {
        'Client-ID': settings.IGDB_CLIENT_ID,
        'Authorization': f'Bearer {settings.IGDB_ACCESS_TOKEN}',
    }
    data = f'fields name,summary,cover.url,genres.name,platforms.abbreviation; where rating_count > 1000 & aggregated_rating > 80; sort popularity desc; limit 50;'
    response = requests.post(url, headers=headers, data=data)
    return processar_resposta(response)

def jogos_aleatorios(request):
    url = "https://api.igdb.com/v4/games"
    headers = {
        'Client-ID': settings.IGDB_CLIENT_ID,
        'Authorization': f'Bearer {settings.IGDB_ACCESS_TOKEN}',
    }
    data = f'fields name,summary,cover.url,genres.name,platforms.abbreviation; sort random(); limit 50;'
    response = requests.post(url, headers=headers, data=data)
    return processar_resposta(response)

def jogos_bem_avaliados(request):
    url = "https://api.igdb.com/v4/games"
    headers = {
        'Client-ID': settings.IGDB_CLIENT_ID,
        'Authorization': f'Bearer {settings.IGDB_ACCESS_TOKEN}',
    }
    data = f'fields name,summary,cover.url,genres.name,platforms.abbreviation, aggregated_rating; where rating_count > 100 & aggregated_rating > 90; sort aggregated_rating desc;'  # Remova o limite da query

    response = requests.post(url, headers=headers, data=data)
    return processar_resposta(response)

def processar_resposta(response):
    if response.status_code == 200:
        jogos_api = response.json()
        jogos = []

        for jogo_api in jogos_api: # Inicio do loop for
            capa_url = 'URL_DA_IMAGEM_PADRAO'

            if jogo_api.get('cover'):
                if jogo_api['cover'].get('image_id'):
                    capa_url = f"https://images.igdb.com/igdb/image/upload/t_cover_big/{jogo_api['cover']['image_id']}.jpg"

            generos = ', '.join([g['name'] for g in jogo_api.get('genres', [])])
            plataformas = ', '.join([p.get('abbreviation', 'N/A') for p in jogo_api.get('platforms', [])])

            # Cria ou atualiza o objeto Jogo no banco de dados
            jogo, created = Jogo.objects.update_or_create(
                nome=jogo_api['name'],
                defaults={
                    'sumario': jogo_api.get('summary', ''),
                    'capa': capa_url,
                    'generos': generos,
                    'plataformas': plataformas,
                }
            )

            jogos.append({
                'id': jogo.id,
                'nome': jogo.nome,
                'sumario': jogo.sumario,
                'capa': jogo.capa,
                'generos': jogo.generos,
                'plataformas': jogo.plataformas,
            }) # Fim do loop for

        return JsonResponse(jogos, safe=False)
    else:
        return JsonResponse({'error': response.text}, status=response.status_code)
