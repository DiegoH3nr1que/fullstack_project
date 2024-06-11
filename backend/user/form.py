from typing import Any, Mapping
from django import forms
from django.core.files.base import File
from django.db.models.base import Model
from django.forms import ModelForm
from django.forms.utils import ErrorList
from .models import CustomUser

class UserForm(forms.Form):
    name = forms.CharField(max_length=255)
    username = forms.CharField(max_length=255, required=True)
    email = forms.CharField(max_length=255, required=True)
    first_name = forms.CharField(max_length=255)
    last_name = forms.CharField(max_length=255)
    date_of_birth = forms.DateField()
    bio = forms.CharField(widget=forms.Textarea)
    password = forms.CharField(max_length=255, required=True, widget=forms.PasswordInput) 



class UserLoginForm(forms.Form):
    username = forms.CharField(max_length=255, required=True)
    password = forms.CharField(max_length=255, required=True, widget=forms.PasswordInput) 