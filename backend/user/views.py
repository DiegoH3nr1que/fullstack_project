from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.views import View
from .authenticate import authenticate_user

from user.form import UserForm, UserLoginForm
from .serializer import UserSerializer
from .repositories import UserRepository
from .exception import UserException


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
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate_user(username=username, password=password)
        print(user)
        if user:
            return JsonResponse({'message': 'Login realizado com sucesso!'}, status=200)
        else:
             return HttpResponse("Usuário ou senha inválidos")


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
        return render(request, "user/form_edit_user.html", {"form": userForm, "id": id})

    def post(self, request, id):
        userForm = UserForm(request.POST)
        if userForm.is_valid():
            serializer = UserSerializer(data=userForm.data)
            if serializer.is_valid():
                repository = UserRepository()
                repository.update_user(id, serializer.data)
            else:
                print(serializer.errors)
        else:
            print(userForm.errors)

        return redirect('User View')
    
