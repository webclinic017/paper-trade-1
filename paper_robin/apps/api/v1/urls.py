""" API v1 URLs. """

from django.urls import include, path
from rest_framework import routers

app_name = 'v1'

router = routers.SimpleRouter()

urlpatterns = [
    path('', include('paper_robin.apps.user.api.urls', namespace='user')),
]


#urlpatterns = router.urls
