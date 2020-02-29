from rest_framework import serializers
from paper_robin.apps.user.models import User, UserProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "is_superuser",
            "password",
        ]

        # These fields are displayed but not editable and have to be a part of 'fields' tuple
        read_only_fields = (
            "username",
            "email",
            "is_superuser",
        )

        # These fields are only editable (not displayed) and have to be a part of 'fields' tuple
        extra_kwargs = {"password": {"write_only": True, "min_length": 4}}


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["id"]
