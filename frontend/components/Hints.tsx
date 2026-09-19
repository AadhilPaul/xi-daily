import type { Hint } from "@/types/game";

export function Hints({ hints }: { hints: Hint[] }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#d6e2d9]">
          Hints unlocked
        </h2>
        <span className="text-xs font-semibold text-[#82958b]">{hints.length} / 3</span>
      </div>
      <div className="flex flex-col gap-2">
        {hints.map((hint, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-[#101d18] p-4"
          >
            <p className="text-sm font-semibold">
              {hint.type === "nationality" && ` Nationality: `}
              {hint.type === "age_bracket" && ` Age at match: `}
              {hint.type === "previous_clubs" && `️ Previous clubs: `}
              <span className="text-[#c8f36b]">
                {Array.isArray(hint.value) ? hint.value.join(", ") : hint.value}
              </span>
            </p>
          </div>
        ))}
        {hints.length === 0 && (
          <p className="rounded-2xl border border-dashed border-white/10 px-4 py-5 text-center text-xs text-[#82958b]">
            Make two guesses to unlock your first hint.
          </p>
        )}
      </div>
    </section>
  );
}