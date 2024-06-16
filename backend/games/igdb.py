import requests
from igdb.wrapper import IGDBWrapper


wrapper = IGDBWrapper('tiu5hxhsub9d9gezmhwx3gqt7p21uc', 'dp1lcg8bxg6gky2z6b0n4hlgyk183a')

def get_game_data(game_name):
    byte_array = wrapper.api_request(
        'games',
        f'search "{game_name}"; fields name,summary,cover.url,genres.name,platforms.name; limit 5;'
    )
    data = json.loads(byte_array.decode('utf-8'))
    return data

