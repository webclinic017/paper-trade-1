from django.core import exceptions
from django.contrib.auth.password_validation import validate_password 
from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from paper_robin.apps.user.models import User, UserProfile

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)


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
            "last_connected"
        ]

        read_only_fields = (
            "username",
            "email",
            "is_superuser",
            "last_connected"
        )

        extra_kwargs = {
            'password': {'write_only': True},
        }

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(make_password(value))
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["id"]
