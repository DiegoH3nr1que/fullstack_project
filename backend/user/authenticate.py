import jwt
from .models import CustomUser
from datetime import datetime, timedelta
from django.conf import settings
from django.http import HttpResponse
from django.contrib.auth.hashers import check_password

def authenticate(username, password):
    try:
        user = CustomUser.objects.get(username=username)
        if check_password(password, user.password):
            return user
        else:
            return HttpResponse("Usuário e senhas inválidos")
    except CustomUser.DoesNotExist:
        return None

def generate_token(user):
    payload = {
        'username': user.username,
        'exp': datetime.utcnow() + timedelta(minutes=5)
    }
    return jwt.encode(payload=payload, 
                      key=getattr(settings, "SECRET_KEY"),
                      algorithm='HS256')

def refreshToken(user):
    return generate_token(user)

def verifyToken(token):
    error_code = 0
    payload = None

    try:
        payload = jwt.decode(jwt=token, 
                            key=getattr(settings, "SECRET_KEY"),
                            algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        error_code = 1
    except jwt.InvalidTokenError:
        error_code = 2
    
    return [error_code, payload]


def getAuthenticateUser(token):
    _, payload = verifyToken(token)

    if payload is not None:
        #procurar o usuário no banco
        return CustomUser(username=payload['username'])
