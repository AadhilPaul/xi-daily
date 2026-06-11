from django.urls import path
from . import views

urlpatterns = [
    path('puzzle/today/', views.today_puzzle, name='today_puzzle'),
    path('players/search/', views.search_player, name='player_search')
]