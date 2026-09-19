import { useEffect, useState } from "react";
import { fetchTodayPuzzle } from "@/lib/api";
import type { Puzzle } from "@/types/game";

export function usePuzzle(): Puzzle | null {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);

  useEffect(() => {
    fetchTodayPuzzle().then(setPuzzle);
  }, []);

  return puzzle;
}