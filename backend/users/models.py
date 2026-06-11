from django.db import models
from puzzles.models import Puzzle, Player
import uuid

# Create your models here.
class AnonymousUser(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_seen = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.uuid)


class UserResult(models.Model):
    user = models.ForeignKey(AnonymousUser, on_delete=models.CASCADE)
    puzzle = models.ForeignKey(Puzzle, on_delete=models.CASCADE)
    solved = models.BooleanField(default=False)
    attempts_used = models.IntegerField(default=0)
    completed_at = models.DateTimeField(null=True, blank=True)
    share_text = models.TextField(blank=True)

    class Meta:
        unique_together = ['user', 'puzzle']


    def __str_(self):
        return f"{self.user} - {self.puzzle}"


class Guess(models.Model):
    result = models.ForeignKey(UserResult, on_delete=models.CASCADE, related_name='guesses')
    attempt_number = models.IntegerField()
    guessed_player = models.ForeignKey(Player, on_delete=models.PROTECT)
    was_correct = models.BooleanField(default=False)
    hint_revealed = models.JSONField(null=True, blank=True)

    class Meta:
        ordering = ['attempt_number']

    def __str__(self):
        return f"Guess {self.attempt_number} - {self.guessed_player}"