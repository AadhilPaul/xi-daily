from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils import timezone
from .models import AnonymousUser, UserResult

@api_view(['GET'])
def user_stats(request):
    user_uuid = request.GET.get('uuid')
    if not user_uuid:
        return Response({"error": "uuid required"}, status=400)

    try:
        user = AnonymousUser.objects.get(uuid=user_uuid)
    except AnonymousUser.DoesNotExist:
        return Response({
            "streak": 0,
            "total_played": 0,
            "total_solved": 0,
        })

    results = UserResult.objects.filter(
        user=user,
        solved=True
    ).order_by('-puzzle__date')

    streak = 0
    expected_date = timezone.now().date()

    for result in results:
        if result.puzzle.date == expected_date:
            streak += 1
            expected_date -= timezone.timedelta(days=1)
        else:
            break

    total_played = UserResult.objects.filter(user=user).count()
    total_solved = UserResult.objects.filter(user=user, solved=True).count()

    return Response({
        "streak": streak,
        "total_played": total_played,
        "total_solved": total_solved,
    })