from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.views import View
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .form import UserForm, UserLoginForm
from .serializer import UserSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth.mixins import UserPassesTestMixin, LoginRequiredMixin
from django.http import HttpResponseForbidden
from rest_framework.views import APIView

class UserLogin(ObtainAuthToken):
    def get(self, request):
        userLoginForm = UserLoginForm()
        return render(request, "user/login_user.html", {"form": userLoginForm})

    def post(self, request):
        # Utilize json para pegar os dados do post
        data = request.data
        username = data.get('username')
        password = data.get('password')

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


class UserView(LoginRequiredMixin, UserPassesTestMixin, APIView):

    def test_func(self):
        return self.request.user.is_superuser
    
    def handle_no_permission(self):
        return HttpResponseForbidden("Você não tem permissão para acessar esta página.")

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return render(request, "user/home_user.html", {"users": serializer.data})



class UserCreate(APIView):
    def get(self, request):
        userForm = UserForm()
        return render(request, "user/form_user.html", {"form": userForm})

    def post(self, request):

        data = request.data
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        first_name = data.get('first_name')
        last_name = data.get('last_name')


        # Crie um dicionário com os dados para inicializar o formulário
        data = {'username': username,'email': email, 'password': password,'first_name': first_name, 'last_name': last_name }

        # Crie uma instância do formulário com os dados recebidos
        userForm = UserForm(data)

        if userForm.is_valid():
            # Salve o usuário no banco de dados
            user = userForm.save(commit=False)  # Cria uma instância do usuário sem salvar no banco ainda
            user.set_password(password)  # Define a senha usando set_password
            user.save()  # Salva o usuário no banco de dados

            # Redirecione para a página de login após o registro bem-sucedido
            return redirect('User Login')
        else:
            # Se o formulário não for válido, renderize o formulário novamente com os erros
            return render(request, "user/form_user.html", {"form": userForm})


class UserDelete(LoginRequiredMixin, UserPassesTestMixin, APIView):

    def test_func(self):
        return self.request.user.is_superuser
    
    def handle_no_permission(self):
        return HttpResponseForbidden("Você não tem permissão para acessar esta página.")

    def get(self, request, id):
        user = User.objects.get(pk=id)
        user.delete()
        return redirect('User View')


class UserEdit(LoginRequiredMixin, UserPassesTestMixin, APIView):
    def get(self, request, id):
        user = User.objects.get(pk=id)
        userForm = UserForm(instance=user)
        return render(request, "user/form_edit_user.html", {"form": userForm, "id": id})
    
    
    def test_func(self):
        return self.request.user.is_superuser
    
    def handle_no_permission(self):
        return HttpResponseForbidden("Você não tem permissão para acessar esta página.")

    def post(self, request, id):
            user = User.objects.get(pk=id)
            userForm = UserForm(request.POST, instance=user)
            if userForm.is_valid():
                user = userForm.save(commit=False)
                user.set_password(userForm.cleaned_data['password'])
                userForm.save()
                return redirect('User View')
            else:
                return render(request, "user/form_edit_user.html", {"form": userForm, "id": id})
