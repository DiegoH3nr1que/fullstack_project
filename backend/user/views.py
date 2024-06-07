from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.views import View

from .authenticate import *
from user.form import UserForm, UserLoginForm
from .serializer import UserSerializer
from .repositories import UserRepository
from .exception import UserException

class AuthLogin(View):
    def post(self, request):
        user = authenticate(username='user', password='a1b2c3')
        if user:
            token = generate_token(user)
            response = redirect('User Login')
            response.set_cookie('jwt', token)
            return response

        return redirect('User Login')

    def get(self, request):
        user = authenticate(username='user', password='a1b2c3')
        if user:
            token = generate_token(user)
            response = redirect('User Loginw')
            response.set_cookie('jwt', token)
            return response

        return redirect('User Login')

class AuthLogout(View):
    def get(self, request):
        response = redirect('User Login')
        response.delete_cookie('jwt')
        return response

class UserView(View):
    def get(self, request):
        repository = UserRepository()
        try:
            users = repository.get_all_users()
            serializer = UserSerializer(users, many=True)
            objectReturn = {"users": serializer.data}
        except UserException as e:
            objectReturn = {"error": e.message}
        
        return render(request, "user/home_user.html", objectReturn)

class UserLogin(View):
    def get(self, request):
        userLoginForm = UserLoginForm()
        return render(request, "user/login_user.html", {"form": userLoginForm})

    def post(self, request):
        userLoginForm = UserLoginForm(request.POST)
        if userLoginForm.is_valid():
            username = userLoginForm.cleaned_data['username']
            password = userLoginForm.cleaned_data['password']

            repository = UserRepository()
            user = repository.get_user_by_username(username)

            if user and user.password == password:  # Supondo que a senha esteja em texto simples, mas normalmente você deve usar hashing
                return "Login funcionou"
            else:
                return redirect('User Login')

        return render(request, "user/login_user.html", {"form": userLoginForm, "error": "Invalid username or password"})

class UserCreate(View):
    def get(self, request):
        userForm = UserForm()
        return render(request, "user/form_user.html", {"form": userForm})

    def post(self, request):
        userForm = UserForm(request.POST)
        if userForm.is_valid():
            serializer = UserSerializer(data=userForm.cleaned_data)
            if serializer.is_valid():
                repository = UserRepository()
                repository.create_user(serializer.validated_data)
            else:
                print(serializer.errors)
        else:
            print(userForm.errors)

        return redirect('User Login')

class UserDelete(View):
    def get(self, request, id):
        repository = UserRepository()
        repository.delete_user(id)
        return redirect('User View')

class UserEdit(View):
    def get(self, request, id):
        repository = UserRepository()
        user = repository.get_user_by_id(id)
        userForm = UserForm(initial=user.__dict__)
        return render(request, "user/form_user.html", {"form": userForm, "id": id})

    def post(self, request, id):
        userForm = UserForm(request.POST)
        if userForm.is_valid():
            serializer = UserSerializer(data=userForm.cleaned_data)
            if serializer.is_valid():
                repository = UserRepository()
                repository.update_user(id, serializer.validated_data)
            else:
                print(serializer.errors)
        else:
            print(userForm.errors)

        return redirect('User Login')
