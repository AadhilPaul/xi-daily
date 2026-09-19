import { MAX_ATTEMPTS } from "@/lib/constants";

export function AttemptCounter({ attempts }: { attempts: number }) {
  return (
    <section
      aria-label="Guess attempts"
      className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#101d18] px-4 py-3"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#82958b]">
          Attempts
        </p>
        <p className="mt-1 text-sm font-bold">{MAX_ATTEMPTS - attempts} guesses left</p>
      </div>
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`size-3 rounded-full border ${index < attempts ? "border-[#c8f36b] bg-[#c8f36b]" : "border-white/20 bg-transparent"}`}
          />
        ))}
      </div>
    </section>
  );
}