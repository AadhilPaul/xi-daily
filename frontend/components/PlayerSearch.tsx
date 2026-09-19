import type { Player } from "@/types/game";

interface PlayerSearchProps {
  query: string;
  results: Player[];
  onQueryChange: (query: string) => void;
  onSelect: (player: Player) => void;
}

export function PlayerSearch({
  query,
  results,
  onQueryChange,
  onSelect,
}: PlayerSearchProps) {
  return (
    <section className="relative">
      <label
        htmlFor="player-search"
        className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#82958b]"
      >
        Who&apos;s missing?
      </label>
      <div className="flex items-center rounded-2xl border border-white/10 bg-[#101d18] px-4 transition focus-within:border-[#c8f36b]/60 focus-within:ring-4 focus-within:ring-[#c8f36b]/10">
        <span className="mr-3 text-lg text-[#82958b]">⌕</span>
        <input
          id="player-search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search for a player..."
          className="min-w-0 flex-1 bg-transparent py-4 text-sm font-medium outline-none placeholder:text-[#5d7168]"
        />
      </div>
      {results.length > 0 && (
        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#16251e] p-1 shadow-xl">
          {results.map((player) => (
            <button
              key={player.id}
              onClick={() => onSelect(player)}
              className="block w-full rounded-xl px-3 py-3 text-left text-sm font-semibold hover:bg-white/10"
            >
              {player.name}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}