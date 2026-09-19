import { getDifficultyLabel } from "@/lib/game";
import type { Puzzle } from "@/types/game";

export function GameHeader({ puzzle }: { puzzle: Puzzle }) {
  return (
    <header className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-xl bg-[#c8f36b] text-sm font-black text-[#102016]">
            XI
          </span>
          <h1 className="text-xl font-black tracking-tight">XI Daily</h1>
        </div>
        <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-[#82958b]">
          {puzzle.date} · Daily football puzzle
        </p>
      </div>
      <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-right">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#82958b]">
          {getDifficultyLabel(puzzle.difficulty)}
        </p>
        <p className="text-sm font-bold text-[#c8f36b]">Puzzle #{puzzle.id}</p>
      </div>
    </header>
  );
}