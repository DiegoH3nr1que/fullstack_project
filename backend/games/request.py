import requests

url = "https://api.igdb.com/v4/games"

headers = {
    "Client-ID": "tiu5hxhsub9d9gezmhwx3gqt7p21uc",
    "Authorization": "Bearer dp1lcg8bxg6gky2z6b0n4hlgyk183a"
}

data = 'fields name, summary, cover.url; where rating > 90; limit 5;'

response = requests.post(url, headers=headers, data=data)

if response.status_code == 200:
    games = response.json()
    # Processar os dados dos jogos
else:
    print(f"Erro na requisição: {response.status_code}")
