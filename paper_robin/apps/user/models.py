from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    custom_field = 5