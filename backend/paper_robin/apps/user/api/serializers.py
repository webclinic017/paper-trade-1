from django.core import exceptions
from django.contrib.auth.password_validation import validate_password 
from rest_framework import serializers

from paper_robin.apps.user.models import User, UserProfile

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_superuser",
            "password",
        ]

        read_only_fields = (
            "username",
            "email",
            "is_superuser",
        )

        extra_kwargs = {
            'password': {'write_only': True},
        }

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["id"]
