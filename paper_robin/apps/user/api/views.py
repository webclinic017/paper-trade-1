
from rest_framework import viewsets

from paper_robin.apps.user.models import User, UserProfile
from paper_robin.apps.user.api.serializers import UserSerializer, UserProfileSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
