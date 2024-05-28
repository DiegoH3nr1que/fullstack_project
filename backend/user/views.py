from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.views import View


from .authenticate import *
from user.form import UserForm, UserLoginForm
from .authenticate import *
from .serializer import UserSerializer
from .repositories import UserRepository
from .exception import UserException

class AuthLogin(View):  
  def post(self, request):
      user = authenticate(username ='user', password='a1b2c3')
      if user:
        token = generate_token(user)
        response = redirect('User Login')
        response.set_cookie('jwt', token)
        
        return response

      return redirect('User Login')


  def get(self, request):
      user = authenticate(username ='user', password='a1b2c3')
      if user:
        token = generate_token(user)
        response = redirect('User Loginw')
        response.set_cookie('jwt', token)
        
        return response

      return redirect('User Login')
  
class AuthLogout(View):
    def get(sekf, request):
        response = redirect('User Login')
        response.delete_cookie('jwt')
        return response


class UserView(View):
    def get(self, request):
        repository = UserRepository(collectionName='users')
        try:
            users = list(repository.getAll())
            serializer = UserSerializer(data=users, many=True)
            if (serializer.is_valid()):
                ModelUser = serializer.save()
                objectReturn = {"weathers":ModelUser}
            else:
                objectReturn = {"error":serializer.errors}
        except UserException as e:
            objectReturn = {"error":e.message}
        
        return render(request, "home_user.html", objectReturn)
    
class UserLogin(View):

    def get(self, request):
        userLoginForm = UserLoginForm()
        return render(request, "login_user.html", {"form": userLoginForm})
    
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

        return render(request, "login_user.html", {"form": userLoginForm, "error": "Invalid username or password"})
    
class UserCreate(View):
    def get(self, request):
        userForm = UserForm()

        return render(request, "form_user.html", {"form": userForm})
    
    def post(self, request):
        userForm = UserForm(request.POST)
        if userForm.is_valid():
            serializer = UserSerializer(data=userForm.data)
            if serializer.is_valid():
                repository = UserRepository()
                repository.create_user(serializer.data)
            else:
                print(serializer.errors)
        else:
            print(userForm.errors)

        return redirect('User Login')
    
    
class UserDelete(View):

    def get(self, request, id):
        # Obter o repositório de clima
        repository = UserRepository(collectionName='users')
        # Excluir o registro de clima com o ID fornecido
        repository.deleteById(id)
        # Redirecionar de volta para a página principal
        return redirect('User View')
    
    
class UserEdit(View):

    def get(self, request, id):
        repository = UserRepository(collectionName='users')
        user = repository.getByID(id)
        userForm = UserForm(initial=user)
        return render(request, "form_user.html", {"form":userForm, "id": id})
    
    def post(self, request, id):
        userForm = UserForm(request.POST)
        if userForm.is_valid():
            serializer = UserSerializer(data=userForm.data)
            serializer.id = id
            if (serializer.is_valid()):
                repository = UserRepository(collectionName='users')
                repository.update(serializer.data, id)
            else:
                print(serializer.errors)
        else:
            print(userForm.errors)

        return redirect('User Login')
