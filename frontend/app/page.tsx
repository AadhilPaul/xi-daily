"use client";

import { useState } from "react";
import { AttemptCounter } from "@/components/AttemptCounter";
import { FootballPitch } from "@/components/FootballPitch";
import { Footer } from "@/components/Footer";
import { GameHeader } from "@/components/GameHeader";
import { GameResult } from "@/components/GameResult";
import { Hints } from "@/components/Hints";
import { MatchInfo } from "@/components/MatchInfo";
import { PlayerSearch } from "@/components/PlayerSearch";
import { useCountdown } from "@/hooks/useCountdown";
import { usePlayerSearch } from "@/hooks/usePlayerSearch";
import { usePuzzle } from "@/hooks/usePuzzle";
import { useStats } from "@/hooks/useStats";
import { submitPuzzleGuess } from "@/lib/api";
import { MAX_ATTEMPTS } from "@/lib/constants";
import { getMissingPosition } from "@/lib/game";
import type { Attempt, Hint, Player } from "@/types/game";

export default function Page() {
  const puzzle = usePuzzle();
  const [query, setQuery] = useState("");
  const searchResults = usePlayerSearch(query);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [hints, setHints] = useState<Hint[]>([]);
  const [finished, setFinished] = useState(false);
  const [solved, setSolved] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [copied, setCopied] = useState(false);
  const countdown = useCountdown();
  const stats = useStats(finished);

  if (!puzzle || !puzzle.formation)
    return (
      <main className="min-h-screen bg-[#07110e] grid place-items-center text-white">
        Loading...
      </main>
    );

  const currentPuzzle = puzzle;
  const missingPosition = getMissingPosition(currentPuzzle);

  async function submitGuess(player: Player) {
    if (finished || attempts.length >= MAX_ATTEMPTS) return;

    const data = await submitPuzzleGuess(currentPuzzle.id, player.id);

    setAttempts((previousAttempts) => [
      ...previousAttempts,
      { name: player.name, correct: data.solved },
    ]);
    setQuery("");

    if (data.hint) {
      setHints((previousHints) => [...previousHints, data.hint as Hint]);
    }

    if (data.solved) {
      setSolved(true);
      setFinished(true);
      setCorrectAnswer(data.correct_answer);
    }

    if (data.game_over) {
      setFinished(true);
      setCorrectAnswer(data.correct_answer);
    }
  }

  async function shareResult() {
    const emoji = attempts
      .map((attempt) => (attempt.correct ? "🟩" : "⬛"))
      .join("");
    try {
      await navigator.clipboard.writeText(
        `XI Daily #${currentPuzzle.id} ⚽\n${emoji}\nxidaily.com`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07110e] px-4 py-5 text-white sm:py-8">
      <div className="mx-auto flex w-full max-w-[480px] flex-col gap-5">
        <GameHeader puzzle={puzzle} />
        <MatchInfo match={puzzle.match_description} />
        <FootballPitch
          puzzle={puzzle}
          missingPosition={missingPosition}
          finished={finished}
          correctAnswer={correctAnswer}
        />

        {!finished ? (
          <>
            <PlayerSearch
              query={query}
              results={searchResults}
              onQueryChange={setQuery}
              onSelect={submitGuess}
            />
            <AttemptCounter attempts={attempts.length} />
          </>
        ) : (
          <GameResult
            solved={solved}
            correctAnswer={correctAnswer}
            attempts={attempts}
            stats={stats}
            copied={copied}
            countdown={countdown}
            onShare={shareResult}
          />
        )}

        <Hints hints={hints} />
        <Footer />
      </div>
    </main>
  );
}