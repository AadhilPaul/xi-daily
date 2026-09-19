import { FORMATION_COORDINATES } from "@/lib/game";
import type { Puzzle } from "@/types/game";

interface FootballPitchProps {
  puzzle: Puzzle;
  missingPosition?: string;
  finished: boolean;
  correctAnswer: string;
}

export function FootballPitch({
  puzzle,
  missingPosition,
  finished,
  correctAnswer,
}: FootballPitchProps) {
  const formationEntries = Object.entries(puzzle.formation);

  return (
    <section
      aria-label="Football formation"
      className="relative aspect-[0.72] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#27804f] to-[#145633] p-3 shadow-2xl shadow-black/30"
    >
      <div className="pointer-events-none absolute inset-3 rounded-[20px] border border-white/25" />
      <div className="pointer-events-none absolute left-1/2 top-3 bottom-3 w-px -translate-x-1/2 bg-white/20" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
      <div className="pointer-events-none absolute left-1/2 top-3 h-20 w-36 -translate-x-1/2 rounded-b-[80px] border border-t-0 border-white/20" />
      <div className="pointer-events-none absolute left-1/2 bottom-3 h-20 w-36 -translate-x-1/2 rounded-t-[80px] border border-b-0 border-white/20" />

      {formationEntries
        .filter(([, name]) => name !== null)
        .map(([position, name]) => {
          const coords = FORMATION_COORDINATES[position] || {
            x: "50%",
            y: "50%",
          };
          return (
            <div
              key={position}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: coords.x, top: coords.y }}
            >
              <div className="mx-auto grid size-10 place-items-center rounded-full border-2 border-white/80 bg-[#f5f8ee] text-[9px] font-black text-[#194b31] shadow-lg sm:size-11">
                {position}
              </div>
              <p className="mt-1 whitespace-nowrap text-[9px] font-bold text-white drop-shadow-md sm:text-[10px]">
                {name}
              </p>
            </div>
          );
        })}

      {missingPosition && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
          style={{
            left: (FORMATION_COORDINATES[missingPosition] || { x: "50%" }).x,
            top: (FORMATION_COORDINATES[missingPosition] || { y: "50%" }).y,
          }}
        >
          {finished ? (
            <>
              <div className="mx-auto grid size-12 place-items-center rounded-full border-2 border-[#c8f36b] bg-[#f5f8ee] text-[9px] font-black text-[#194b31] shadow-lg">
                {missingPosition}
              </div>
              <p className="mt-2 whitespace-nowrap rounded-full bg-[#102a1d]/80 px-2 py-1 text-[10px] font-bold text-[#e6f8c5]">
                {correctAnswer}
              </p>
            </>
          ) : (
            <>
              <div className="mx-auto grid size-12 animate-pulse place-items-center rounded-full border-2 border-[#c8f36b] bg-[#173e2a] text-xl font-black text-[#c8f36b] shadow-[0_0_0_7px_rgba(200,243,107,0.12)]">
                ?
              </div>
              <p className="mt-2 rounded-full bg-[#102a1d]/75 px-2 py-1 text-[10px] font-bold text-[#e6f8c5]">
                {missingPosition} · Missing
              </p>
            </>
          )}
        </div>
      )}
    </section>
  );
}