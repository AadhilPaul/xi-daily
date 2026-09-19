import type { Attempt, Stats } from "@/types/game";

interface GameResultProps {
  solved: boolean;
  correctAnswer: string;
  attempts: Attempt[];
  stats: Stats;
  copied: boolean;
  countdown: string;
  onShare: () => void;
}

export function GameResult({
  solved,
  correctAnswer,
  attempts,
  stats,
  copied,
  countdown,
  onShare,
}: GameResultProps) {
  return (
    <section className="rounded-[28px] border border-[#c8f36b]/25 bg-[#14271c] p-5 text-center shadow-xl shadow-[#c8f36b]/5">
      <p className="text-3xl font-black text-[#c8f36b]">{solved ? "✓" : "✗"}</p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-[#c8f36b]">
        {solved ? "Puzzle complete" : "Better luck tomorrow"}
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-tight">
        The missing player was {correctAnswer}
      </h2>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-black/15 p-3">
          <p className="text-2xl font-black text-white">{attempts.length}/5</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#82958b]">
            Attempts used
          </p>
        </div>
        <div className="rounded-2xl bg-black/15 p-3">
          <p className="text-2xl font-black text-[#c8f36b]">{stats.streak}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#82958b]">
            Day streak
          </p>
        </div>
      </div>
      <button
        onClick={onShare}
        className="mt-4 w-full rounded-2xl bg-[#c8f36b] py-3.5 text-sm font-black text-[#122218] transition hover:bg-[#ddff91]"
      >
        {copied ? "Result copied" : "Share your result"}
      </button>
      <p className="mt-4 text-xs text-[#82958b]">
        Next puzzle in <span className="font-bold text-white">{countdown}</span>
      </p>
    </section>
  );
}