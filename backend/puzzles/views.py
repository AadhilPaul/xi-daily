from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import PuzzleSerializer, PlayerSearchSerializer
from .models import Puzzle, Player
from django.utils import timezone
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