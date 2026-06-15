import { useState, useEffect } from "react";
import { getTodaysPuzzle, searchPlayers, submitGuess } from "../api";
import type { Puzzle, Hint, GuessResult, Player } from "../types";

export function useGame() {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [hints, setHints] = useState<Hint[]>([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing",
  );
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Player[]>([]);

  useEffect(() => {
    getTodaysPuzzle().then((data) => setPuzzle(data));
  }, []);

  async function search(query: string) {
    if (query.length < 2) return setSearchResults([]);
    const results = await searchPlayers(query);
    setSearchResults(results);
  }

  async function guess(playerId: number, playerName: string) {
    if (!puzzle || gameStatus !== "playing") return;

    const res = await submitGuess(puzzle.id, playerId);

    setGuesses((prev) => [...prev, { playerName, ...res }]);

    if (res.hint) {
      setHints((prev) => [...prev, res.hint]);
    }

    if (res.solved) {
      setCorrectAnswer(res.correct_answer);
      setGameStatus("won");
    } else if (res.game_over) {
      setCorrectAnswer(res.correct_answer);
      setGameStatus("lost");
    }
  }
  return {
    puzzle,
    guesses,
    hints,
    gameStatus,
    correctAnswer,
    searchResults,
    search,
    guess,
  };
}
