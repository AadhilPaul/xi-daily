from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import PuzzleSerializer, PlayerSearchSerializer
from .models import Puzzle, Player
from django.utils import timezone
from users.models import AnonymousUser, UserResult, Guess
from .hints import get_hint
# Create your views here.

@api_view(['GET'])
def today_puzzle(request):
    today = timezone.now().date()
    try:
        puzzle = Puzzle.objects.get(date=today)
        serializer = PuzzleSerializer(puzzle)
        return Response(serializer.data)
    except Puzzle.DoesNotExist:
        return Response({"error": "No puzzle found for today"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def search_player(request):
    query = request.GET.get('q', '')
    if len(query) < 2:
        return Response([])
    players = Player.objects.filter(name__icontains=query)[:10]
    serializer = PlayerSearchSerializer(players, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def submit_guess(request, puzzle_id):
    user_uuid = request.data.get('user_uuid')
    if not user_uuid:
        return Response(
            {"error": "user_uuid required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    user, _ = AnonymousUser.objects.get_or_create(uuid=user_uuid)

    try:
        puzzle = Puzzle.objects.get(id=puzzle_id)
    except Puzzle.DoesNotExist:
        return Response(
            {"error": "PUzzle Not Found"},
            status=status.HTTP_404_NOT_FOUND
        )


    result, _ = UserResult.objects.get_or_create(user=user, puzzle=puzzle)

    if result.solved or result.attempts_used >= 5:
        return Response(
            {"error": "This puzzle is already completed"},
            status=status.HTTP_400_BAD_REQUEST
        )

    guessed_player_id = request.data.get('player_id')
    try:
        guessed_player = Player.objects.get(id=guessed_player_id)
    except guessed_player.DoesNotExist:
        return Response(
            {"error": "Player not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    result.attempts_used += 1
    was_correct = guessed_player.id == puzzle.missing_player.id

    hint = get_hint(result.attempts_used, puzzle.missing_player, puzzle)

    Guess.objects.create(result=result,
    attempt_number=result.attempts_used,
    guessed_player=guessed_player,
    was_correct=was_correct,
    hint_revealed=hint)

    if was_correct:
        result.solved = True
        result.completed_at = timezone.now()
        result.save()
        return Response({
            "solved": True,
            "correct_answer": puzzle.missing_player.name
        })

    result.save()


    if result.attempts_used >= 5:
        return Response({
            "solved": False,
            "game_over": True,
            "attempts_remaining": 0,
            "hint": hint,
            "correct_answer": puzzle.missing_player.name
        })

    return Response({
        "solved": False,
        "game_over": False,
        "attempts_remaining": 5 - result.attempts_used,
        "hint": hint
    })