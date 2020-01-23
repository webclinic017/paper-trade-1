from rest_framework import permissions


class IsAnonOrAdminCreate(permissions.IsAuthenticated):

    def has_permission(self, request, view):
        is_authenticated = super().has_permission(self, request, view)
        # allow users to be created without authentication
        return not is_authenticated or request.user.is_superuser


class OwnerUserPermission(permissions.IsAuthenticated):
    """
    Object-level permission to only allow owner user to update object
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS or request.user.is_superuser:
            return True

        if hasattr(obj, 'user'):
            return obj.user == request.user
        else:
            return obj == request.user
        
