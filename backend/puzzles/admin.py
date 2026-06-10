from django.contrib import admin
from .models import *

# Register your models here.

class PlayerClubInline(admin.TabularInline):
    model = PlayerClub
    extra = 3

@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ['name', 'nationality', 'date_of_birth']
    search_fields = ['name']
    inlines = [PlayerClubInline]

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ['home_team', 'away_team', 'competition', 'date_played']
    search_fields = ['home_team', 'away_team', 'competition']

@admin.register(Puzzle)
class PuzzleAdmin(admin.ModelAdmin):
    list_display = ['date', 'match', 'missing_player', 'difficulty']
    list_filter = ['difficulty']

admin.site.register(PlayerClub)
