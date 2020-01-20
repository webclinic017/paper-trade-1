from rest_framework import serializers
from paper_robin.apps.user.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'custom_field']

