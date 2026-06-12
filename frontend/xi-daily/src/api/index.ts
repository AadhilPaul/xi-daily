const BASE_URL = "http://127.0.0.1:8000/api";

export async function getTodaysPuzzle() {
  const res = await fetch(`${BASE_URL}/puzzle/today`);
  return res.json();
}

export async function searchPlayers(query: string) {
  const res = await fetch(
    `${BASE_URL}/players/search/?q=${encodeURIComponent(query)}`,
  );
  return res.json();
}

export async function submitGuess(puzzleId: number, playerId: number) {
  const { getOrCreateUUID } = await import("../utils/uuid");
  const uuid = getOrCreateUUID();

  const res = await fetch(`${BASE_URL}/puzzle/${puzzleId}/guess/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_uuid: uuid,
      player_id: playerId,
    }),
  });
  return res.json();
}
