""" API v1 URLs. """

from django.urls import include, path
from rest_framework import routers
from paper_robin.apps.api.v1.views import schema_view

app_name = 'v1'

router = routers.SimpleRouter()

urlpatterns = [
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='api_docs'),
    path('users', include('paper_robin.apps.user.api.urls', namespace='user')),
]


#urlpatterns = router.urls
