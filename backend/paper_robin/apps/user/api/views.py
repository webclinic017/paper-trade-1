from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from paper_robin.apps.user.models import User, UserProfile
from paper_robin.apps.user.api.serializers import UserSerializer, UserProfileSerializer
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

        if self.action == "create":
            permission_classes += [IsAnonOrAdminCreate]
        elif self.action not in permissions.SAFE_METHODS:
            permission_classes += [OwnerUserPermission]

        return [pc() for pc in permission_classes]

    @action(detail=False, methods=["get"], url_path="me")
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """

    permission_classes = [OwnerUserPermission]
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
