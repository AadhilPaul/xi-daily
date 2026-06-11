from rest_framework import serializers
from .models import Player, Match, Puzzle


class PlayerSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name', 'nationality']

class PuzzleSerializer(serializers.ModelSerializer):
    match_description = serializers.SerializerMethodField()
    formation = serializers.SerializerMethodField()

    class Meta:
        model = Puzzle
        fields = ['id', 'date', 'match_description', 'formation', 'missing_position', 'difficulty']

    def get_match_description(self, obj):
        match = obj.match
        return {
            'home_team': match.home_team,
            'away_team': match.away_team,
            'competition': match.competition,
            'season': match.season,
            'description': match.description,
        }

    def get_formation(self, obj):
        from .models import Player
        formation = {}
        for position, player_id in obj.formation.items():
            if player_id == obj.missing_player.id:
                formation[position] = None
            else:
                try:
                    player = Player.objects.get(id=player_id)
                    formation[position] = player.name
                except Player.DoesNotExist:
                    formation[position] = None
        return formation
