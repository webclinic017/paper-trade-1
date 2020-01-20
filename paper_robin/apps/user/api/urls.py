from django.urls import path

from paper_robin.apps.user.api import views

app_name = 'users'

urlpatterns = [
    path('/', views.user_list),
    path('/<int:pk>/', views.user_detail),
]