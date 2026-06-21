from django.db import models

# Create your models here.
class Player(models.Model):
    name = models.CharField(max_length=100)
    known_aliases = models.JSONField(default=list, blank=True)
    nationality = models.CharField(max_length=100)
    date_of_birth = models.DateField()

    def __str__(self):
        return self.name

class PlayerClub(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='clubs')
    club_name = models.CharField(max_length=100)
    joined = models.DateField()
    left = models.DateField(null=True, blank=True)
    is_notable = models.BooleanField(default=False)

    class Meta:
        ordering = ['joined']

    def __str__(self):
        return f'{self.player.name} -> {self.club_name}'


class Match(models.Model):
    home_team = models.CharField(max_length=100)
    away_team = models.CharField(max_length=100)
    competition = models.CharField(max_length=200)
    season = models.CharField(max_length=20)
    date_played = models.DateField()
    formation = models.CharField(max_length=10, default='4-3-3')
    description = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return f'{self.home_team} vs {self.away_team} - {self.competition}'


class Puzzle(models.Model):
    DIFFICULTY_CHOICES = [
        (1, 'Easy'),
        (2, 'Medium'),
        (3, 'Hard'),
    ]

    date = models.DateField(unique=True)
    match = models.ForeignKey(Match, on_delete=models.PROTECT)
    missing_player = models.ForeignKey(Player, on_delete=models.PROTECT, related_name='missing_in_puzzles')
    missing_position = models.CharField(max_length=10)
    formation = models.JSONField()
    difficulty = models.IntegerField(choices=DIFFICULTY_CHOICES, default=1)

    def __str__(self):
        return f'Puzzle {self.date} - {self.match}'




