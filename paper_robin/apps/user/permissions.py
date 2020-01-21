from rest_framework import permissions


class IsAnonOrAdminCreate(permissions.BasePermission):

    def has_permission(self, request, view):
        # allow users to be created without authentication
        return not request.user.is_authenticated or request.user.is_superuser


class OwnerUserPermission(permissions.BasePermission):
    """
    Object-level permission to only allow owner user to update object
    """

    def has_permission(self, request, view):
        # seems redundant to have auth checks in custom permissions, revisit
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        if hasattr(obj, 'user'):
            return obj.user == request.user
        else:
            return obj == request.user

        
