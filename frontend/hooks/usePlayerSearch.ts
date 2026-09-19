import { useEffect, useState } from "react";
import { searchPlayers } from "@/lib/api";
import type { Player } from "@/types/game";

export function usePlayerSearch(query: string): Player[] {
  const [searchResults, setSearchResults] = useState<Player[]>([]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      return;
    }
    searchPlayers(query).then(setSearchResults);
  }, [query]);

  return searchResults;
}