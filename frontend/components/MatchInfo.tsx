import type { MatchDescription } from "@/types/game";

export function MatchInfo({ match }: { match: MatchDescription }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#101d18] px-4 py-3">
      <p className="text-sm font-bold">
        {match.home_team} <span className="text-[#82958b]">vs</span>{" "}
        {match.away_team}
      </p>
      <p className="mt-1 text-xs text-[#82958b]">
        {match.competition} · {match.season}
      </p>
      {match.description && (
        <p className="mt-1 text-xs font-semibold text-[#c8f36b]">
          {match.description} · {match.formation_type}
        </p>
      )}
    </section>
  );
}