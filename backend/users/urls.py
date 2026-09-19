from django.urls import path
from . import views

urlpatterns = [
    path('me/stats/', views.user_stats, name='user_stats'),
]