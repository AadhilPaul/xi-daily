export interface MatchDescription {
  home_team: string;
  away_team: string;
  competition: string;
  season: string;
  description?: string | null;
  formation_type?: string | null;
}

export interface Puzzle {
  id: number;
  date: string;
  difficulty: number;
  formation: Record<string, string | null>;
  match_description: MatchDescription;
}

export interface Player {
  id: number;
  name: string;
}

export interface Hint {
  type: "nationality" | "age_bracket" | "previous_clubs" | string;
  value: string | string[];
}

export interface Attempt {
  name: string;
  correct: boolean;
}

export interface Stats {
  streak: number;
  total_played: number;
  total_solved: number;
}

export interface GuessResponse {
  solved: boolean;
  game_over: boolean;
  correct_answer: string;
  hint?: Hint | null;
}

export interface PuzzleResult {
  completed: boolean;
  attempts: Attempt[];
  hints: Hint[];
  solved: boolean;
  correct_answer: string;
}

export type FormationCoordinates = Record<string, { x: string; y: string }>;