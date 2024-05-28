# repositories.py
from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from .models import CustomUser

class UserRepository:
    def get_all_users(self):
        return CustomUser.objects.all()

    def get_user_by_id(self, user_id):
        try:
            return CustomUser.objects.get(pk=user_id)
        except ObjectDoesNotExist:
            return None

    def create_user(self, user_data):
        user = CustomUser(**user_data)
        user.save()
        return user

    def update_user(self, user_id, updated_data):
        user = self.get_user_by_id(user_id)
        if user is not None:
            for key, value in updated_data.items():
                setattr(user, key, value)
            user.save()
            return user
        return None

    def delete_user(self, user_id):
        user = self.get_user_by_id(user_id)
        if user is not None:
            user.delete()
            return True
        return False
