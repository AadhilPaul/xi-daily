import { useState, useEffect } from "react";
import { getTodaysPuzzle, searchPlayers, submitGuess } from "../api";

export function useGame() {
  const [puzzle, setPuzzle] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [hints, setHints] = useState([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "lost" | "won">(
    "playing",
  );
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

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
