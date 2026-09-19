import { useEffect, useState } from "react";
import { fetchStats } from "@/lib/api";
import type { Stats } from "@/types/game";

const initialStats: Stats = { streak: 0, total_played: 0, total_solved: 0 };

export function useStats(finished: boolean): Stats {
  const [stats, setStats] = useState<Stats>(initialStats);

  useEffect(() => {
    fetchStats().then(setStats);
  }, [finished]);

  return stats;
}