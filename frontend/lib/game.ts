import type { FormationCoordinates, Puzzle } from "@/types/game";

export const FORMATION_COORDINATES: FormationCoordinates = {
  GK: { x: "50%", y: "88%" },
  LB: { x: "12%", y: "68%" },
  CB1: { x: "37%", y: "72%" },
  CB2: { x: "63%", y: "72%" },
  RB: { x: "88%", y: "68%" },
  CM1: { x: "23%", y: "48%" },
  CM2: { x: "50%", y: "44%" },
  CM3: { x: "77%", y: "48%" },
  LW: { x: "84%", y: "22%" },
  ST: { x: "50%", y: "14%" },
  RW: { x: "16%", y: "22%" },
  CAM: { x: "50%", y: "35%" },
};

export function getDifficultyLabel(difficulty: number): string {
  return difficulty === 1 ? "Easy" : difficulty === 2 ? "Medium" : "Hard";
}

export function getMissingPosition(puzzle: Puzzle): string | undefined {
  return Object.keys(puzzle.formation).find(
    (position) => puzzle.formation[position] === null,
  );
}