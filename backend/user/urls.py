from django.urls import path
from user.views import *

urlpatterns = [
    path('login/', UserLogin.as_view(), name="User Login"),
    path('logout/', UserLogout.as_view(), name="User Logout"),
    path('create/', UserCreate.as_view(), name="User Create"),
    path('admin/', UserView.as_view(), name="User View"),
    path('delete/<id>', UserDelete.as_view(), name="User Delete"),
    path('edit/<id>', UserEdit.as_view(), name="User Edit"),
]