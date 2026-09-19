import { BASE_URL } from "@/lib/constants";
import { getUserUUID } from "@/lib/uuid";
import type {
  GuessResponse,
  Player,
  Puzzle,
  PuzzleResult,
  Stats,
} from "@/types/game";

export async function fetchTodayPuzzle(): Promise<Puzzle> {
  const response = await fetch(`${BASE_URL}/api/puzzle/today/`);
  return response.json() as Promise<Puzzle>;
}

export async function fetchPuzzleResult(puzzleId: number): Promise<PuzzleResult> {
  const response = await fetch(
    `${BASE_URL}/api/puzzle/${puzzleId}/result/?uuid=${getUserUUID()}`,
  );
  return response.json() as Promise<PuzzleResult>;
}

export async function searchPlayers(query: string): Promise<Player[]> {
  const response = await fetch(
    `${BASE_URL}/api/players/search/?q=${query}`,
  );
  return response.json() as Promise<Player[]>;
}

export async function fetchStats(): Promise<Stats> {
  const uuid = getUserUUID();
  const response = await fetch(`${BASE_URL}/api/me/stats/?uuid=${uuid}`);
  return response.json() as Promise<Stats>;
}

export async function submitPuzzleGuess(
  puzzleId: number,
  playerId: number,
): Promise<GuessResponse> {
  const response = await fetch(`${BASE_URL}/api/puzzle/${puzzleId}/guess/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_uuid: getUserUUID(), player_id: playerId }),
  });
  return response.json() as Promise<GuessResponse>;
}