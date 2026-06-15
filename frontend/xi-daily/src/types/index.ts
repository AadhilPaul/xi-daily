export interface MatchDescription {
  home_team: string;
  away_team: string;
  competition: string;
  season: string;
  description: string;
}

export interface Formation {
  [position: string]: string | null;
}

export interface Puzzle {
  id: number;
  date: string;
  match_description: MatchDescription;
  formation: Formation;
  missing_position: string;
  difficulty: number;
}

export interface Hint {
  type: 'nationality' | 'age_bracket' | 'previous_clubs';
  value: string;
}

export interface GuessResult {
  playerName: string;
  solved: boolean;
  game_over: boolean;
  attempts_remaining: number;
  hint?: Hint;
  correct_answer?: string;
}

export interface Player {
  id: number;
  name: string;
  nationality: string;
}