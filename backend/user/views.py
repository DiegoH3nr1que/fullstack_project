from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.views import View
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .form import UserForm, UserLoginForm
from .serializer import UserSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth.decorators import login_required


class UserLogin(ObtainAuthToken):
    def get(self, request):
        userLoginForm = UserLoginForm()
        return render(request, "user/login_user.html", {"form": userLoginForm})
    
    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            response = JsonResponse({"token": token.key})
            response.set_cookie('jwt', token.key)
            return response
        else:
            return HttpResponse("Usuário ou senha inválidos", status=401)

class UserLogout(View):
    def get(self, request):
        if request.user.is_authenticated:
            logout(request)
            response = redirect('User Login')
            response.delete_cookie('jwt')
            return response
        return HttpResponse("Você não está autenticado")


class UserView(View):

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return render(request, "user/home_user.html", {"users": serializer.data})


class UserCreate(View):
    def get(self, request):
        userForm = UserForm()
        return render(request, "user/form_user.html", {"form": userForm})

    def post(self, request):
        userForm = UserForm(request.POST)
        if userForm.is_valid():
            user = userForm.save(commit=False)  # Cria uma instância do usuário sem salvar no banco ainda
            user.set_password(userForm.cleaned_data['password'])  # Define a senha usando set_password
            user.save()  # Salva o usuário no banco de dados

            # Redireciona para a página de login após o registro bem-sucedido
            return redirect('User Login')
        else:
            # Se o formulário não for válido, renderiza o formulário novamente com os erros
            return render(request, "user/form_user.html", {"form": userForm})

class UserDelete(View):
    def get(self, request, id):
        user = User.objects.get(pk=id)
        user.delete()
        return redirect('User View')


class UserEdit(View):
    def get(self, request, id):
        user = User.objects.get(pk=id)
        userForm = UserForm(instance=user)
        return render(request, "user/form_edit_user.html", {"form": userForm, "id": id})

    def post(self, request, id):
        if request.user.is_authenticated:
            user = User.objects.get(pk=id)
            userForm = UserForm(request.POST, instance=user)
            if userForm.is_valid():
                user = userForm.save(commit=False)
                user.set_password(userForm.cleaned_data['password'])
                userForm.save()
                return redirect('User View')
            else:
                return render(request, "user/form_edit_user.html", {"form": userForm, "id": id})
        return HttpResponse("Você não está autenticado")
