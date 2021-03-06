from rest_framework.routers import DefaultRouter

from paper_robin.apps.user.api import views

app_name = "users"

router = DefaultRouter()
router.register("users", views.UserViewSet)
router.register("user_profiles", views.UserProfileViewSet)
urlpatterns = router.urls
