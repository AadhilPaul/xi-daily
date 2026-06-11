from datetime import date

def get_age_bracket(date_of_birth, match_date):
    age = match_date.year - date_of_birth.year

    if age <= 23:
        return "20-23 (young player)"
    elif age <= 28:
        return "24-28 (prime years)"
    elif age <= 32:
        return "29-32 (experienced)"
    else:
        return "33+ (veteran)"

def get_hint(attempt_number, player, puzzle):
    if attempt_number == 2:
        return {
            "type": "nationality",
            "value": player.nationality
        }
    elif attempt_number == 3:
        bracket = get_age_bracket(player.date_of_birth, puzzle.match.date_played)
        return {
            "type": "age_bracket",
            "value": bracket
        }

    elif attempt_number == 4:
        clubs = player.clubs.filter(is_notable=True, left__lt=puzzle.match.date_played).values_list('club_name', flat=True)
        return {
            "type": "previous_clubs",
            "value": list(clubs)
        }
    return None