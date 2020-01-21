
from rest_framework import viewsets, permissions

from paper_robin.apps.user.models import User, UserProfile
from paper_robin.apps.user.api.serializers import (UserSerializer, UserProfileSerializer)
from paper_robin.apps.user.permissions import IsAnonOrAdminCreate, OwnerUserPermission


class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that
        this view requires.
        """
        permission_classes = []

        if self.action == 'create':
            permission_classes += [IsAnonOrAdminCreate]
        elif self.action not in permissions.SAFE_METHODS:
            permission_classes += [permissions.IsAuthenticated, OwnerUserPermission]
        
        return [pc() for pc in permission_classes]

        
class UserProfileViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    permission_classes = [OwnerUserPermission]
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
