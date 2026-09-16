'use client'

import { useMemo, useState, useEffect } from 'react'

const BASE_URL = 'http://127.0.0.1:8000'

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

function getUserUUID() {
  let uuid = localStorage.getItem('xi_daily_uuid')
  if (!uuid) {
    uuid = generateUUID()
    localStorage.setItem('xi_daily_uuid', uuid)
  }
  return uuid
}

export default function Page() {
  const [puzzle, setPuzzle] = useState<any>(null)
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [attempts, setAttempts] = useState<any[]>([])
  const [hints, setHints] = useState<any[]>([])
  const [finished, setFinished] = useState(false)
  const [solved, setSolved] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch(`${BASE_URL}/api/puzzle/today/`)
      .then(r => r.json())
      .then(data => setPuzzle(data))
  }, [])

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([])
      return
    }
    fetch(`${BASE_URL}/api/players/search/?q=${query}`)
      .then(r => r.json())
      .then(data => setSearchResults(data))
  }, [query])

  if (!puzzle) return (
    <main className="min-h-screen bg-[#07110e] grid place-items-center text-white">
      Loading...
    </main>
  )

  const formationEntries = Object.entries(puzzle.formation)
  const missingPosition = Object.keys(puzzle.formation).find(
    key => puzzle.formation[key] === null
  )

  async function submitGuess(playerName: string, playerId: number) {
    if (finished || attempts.length >= 5) return

    const uuid = getUserUUID()
    const response = await fetch(`${BASE_URL}/api/puzzle/${puzzle.id}/guess/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_uuid: uuid, player_id: playerId })
    })
    const data = await response.json()

    setAttempts(prev => [...prev, { name: playerName, correct: data.solved }])
    setQuery('')
    setSearchResults([])

    if (data.hint) {
      setHints(prev => [...prev, data.hint])
    }

    if (data.solved) {
      setSolved(true)
      setFinished(true)
      setCorrectAnswer(data.correct_answer)
    }

    if (data.game_over) {
      setFinished(true)
      setCorrectAnswer(data.correct_answer)
    }
  }

  async function shareResult() {
    const emoji = attempts.map(a => a.correct ? '🟩' : '⬛').join('')
    try {
      await navigator.clipboard.writeText(`XI Daily #${puzzle.id} ⚽\n${emoji}\nxidaily.com`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const difficultyLabel = puzzle.difficulty === 1 ? 'Easy' : puzzle.difficulty === 2 ? 'Medium' : 'Hard'

  return (
    <main className="min-h-screen bg-[#07110e] px-4 py-5 text-white sm:py-8">
      <div className="mx-auto flex w-full max-w-[480px] flex-col gap-5">
        <header className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-xl bg-[#c8f36b] text-sm font-black text-[#102016]">XI</span>
              <h1 className="text-xl font-black tracking-tight">XI Daily</h1>
            </div>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-[#82958b]">
              {puzzle.date} · Daily football puzzle
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#82958b]">{difficultyLabel}</p>
            <p className="text-sm font-bold text-[#c8f36b]">Puzzle #{puzzle.id}</p>
          </div>
        </header>

        <section className="rounded-2xl border border-white/10 bg-[#101d18] px-4 py-3">
          <p className="text-sm font-bold">
            {puzzle.match_description.home_team} <span className="text-[#82958b]">vs</span> {puzzle.match_description.away_team}
          </p>
          <p className="mt-1 text-xs text-[#82958b]">
            {puzzle.match_description.competition} · {puzzle.match_description.season}
          </p>
          {puzzle.match_description.description && (
            <p className="mt-1 text-xs font-semibold text-[#c8f36b]">
              {puzzle.match_description.description} · {puzzle.match_description.formation_type}
            </p>
          )}
        </section>

        <section aria-label="Football formation" className="relative aspect-[0.72] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#27804f] to-[#145633] p-3 shadow-2xl shadow-black/30">
          <div className="pointer-events-none absolute inset-3 rounded-[20px] border border-white/25" />
          <div className="pointer-events-none absolute left-1/2 top-3 bottom-3 w-px -translate-x-1/2 bg-white/20" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
          <div className="pointer-events-none absolute left-1/2 top-3 h-20 w-36 -translate-x-1/2 rounded-b-[80px] border border-t-0 border-white/20" />
          <div className="pointer-events-none absolute left-1/2 bottom-3 h-20 w-36 -translate-x-1/2 rounded-t-[80px] border border-b-0 border-white/20" />

          {formationEntries.filter(([, name]) => name !== null).map(([position, name]) => {
            const positionCoords: Record<string, { x: string, y: string }> = {
              GK:  { x: '50%', y: '88%' },
              LB:  { x: '12%', y: '68%' },
              CB1: { x: '37%', y: '72%' },
              CB2: { x: '63%', y: '72%' },
              RB:  { x: '88%', y: '68%' },
              CM1: { x: '23%', y: '48%' },
              CM2: { x: '50%', y: '44%' },
              CM3: { x: '77%', y: '48%' },
              LW:  { x: '84%', y: '22%' },
              ST:  { x: '50%', y: '14%' },
              RW:  { x: '16%', y: '22%' },
              CAM: { x: '50%', y: '35%' },
            }
            const coords = positionCoords[position] || { x: '50%', y: '50%' }
            return (
              <div key={position} className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: coords.x, top: coords.y }}>
                <div className="mx-auto grid size-10 place-items-center rounded-full border-2 border-white/80 bg-[#f5f8ee] text-[9px] font-black text-[#194b31] shadow-lg sm:size-11">
                  {position}
                </div>
                <p className="mt-1 whitespace-nowrap text-[9px] font-bold text-white drop-shadow-md sm:text-[10px]">{name as string}</p>
              </div>
            )
          })}

          {missingPosition && (() => {
            const positionCoords: Record<string, { x: string, y: string }> = {
              GK:  { x: '50%', y: '88%' },
              LB:  { x: '12%', y: '68%' },
              CB1: { x: '37%', y: '72%' },
              CB2: { x: '63%', y: '72%' },
              RB:  { x: '88%', y: '68%' },
              CM1: { x: '23%', y: '48%' },
              CM2: { x: '50%', y: '44%' },
              CM3: { x: '77%', y: '48%' },
              LW:  { x: '84%', y: '22%' },
              ST:  { x: '50%', y: '14%' },
              RW:  { x: '16%', y: '22%' },
              CAM: { x: '50%', y: '35%' },
            }
            const coords = positionCoords[missingPosition] || { x: '50%', y: '50%' }
            return (
              <div className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: coords.x, top: coords.y }}>
                {finished ? (
                  <>
                    <div className="mx-auto grid size-12 place-items-center rounded-full border-2 border-[#c8f36b] bg-[#f5f8ee] text-[9px] font-black text-[#194b31] shadow-lg">
                      {missingPosition}
                    </div>
                    <p className="mt-2 whitespace-nowrap rounded-full bg-[#102a1d]/80 px-2 py-1 text-[10px] font-bold text-[#e6f8c5]">{correctAnswer}</p>
                  </>
                ) : (
                  <>
                    <div className="mx-auto grid size-12 animate-pulse place-items-center rounded-full border-2 border-[#c8f36b] bg-[#173e2a] text-xl font-black text-[#c8f36b] shadow-[0_0_0_7px_rgba(200,243,107,0.12)]">?</div>
                    <p className="mt-2 rounded-full bg-[#102a1d]/75 px-2 py-1 text-[10px] font-bold text-[#e6f8c5]">{missingPosition} · Missing</p>
                  </>
                )}
              </div>
            )
          })()}
        </section>

        {!finished ? (
          <>
            <section className="relative">
              <label htmlFor="player-search" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#82958b]">Who&apos;s missing?</label>
              <div className="flex items-center rounded-2xl border border-white/10 bg-[#101d18] px-4 transition focus-within:border-[#c8f36b]/60 focus-within:ring-4 focus-within:ring-[#c8f36b]/10">
                <span className="mr-3 text-lg text-[#82958b]">⌕</span>
                <input
                  id="player-search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search for a player..."
                  className="min-w-0 flex-1 bg-transparent py-4 text-sm font-medium outline-none placeholder:text-[#5d7168]"
                />
              </div>
              {searchResults.length > 0 && (
                <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#16251e] p-1 shadow-xl">
                  {searchResults.map(player => (
                    <button key={player.id} onClick={() => submitGuess(player.name, player.id)} className="block w-full rounded-xl px-3 py-3 text-left text-sm font-semibold hover:bg-white/10">
                      {player.name}
                    </button>
                  ))}
                </div>
              )}
            </section>

            <section aria-label="Guess attempts" className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#101d18] px-4 py-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#82958b]">Attempts</p>
                <p className="mt-1 text-sm font-bold">{5 - attempts.length} guesses left</p>
              </div>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map(index => (
                  <div key={index} className={`size-3 rounded-full border ${index < attempts.length ? 'border-[#c8f36b] bg-[#c8f36b]' : 'border-white/20 bg-transparent'}`} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="rounded-[28px] border border-[#c8f36b]/25 bg-[#14271c] p-5 text-center shadow-xl shadow-[#c8f36b]/5">
            <p className="text-3xl font-black text-[#c8f36b]">{solved ? '✓' : '✗'}</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-[#c8f36b]">{solved ? 'Puzzle complete' : 'Better luck tomorrow'}</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">The missing player was {correctAnswer}</h2>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-black/15 p-3">
                <p className="text-2xl font-black text-white">{attempts.length}/5</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#82958b]">Attempts used</p>
              </div>
              <div className="rounded-2xl bg-black/15 p-3">
                <p className="text-2xl font-black text-[#c8f36b]">3</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#82958b]">Day streak</p>
              </div>
            </div>
            <button onClick={shareResult} className="mt-4 w-full rounded-2xl bg-[#c8f36b] py-3.5 text-sm font-black text-[#122218] transition hover:bg-[#ddff91]">
              {copied ? 'Result copied' : 'Share your result'}
            </button>
          </section>
        )}

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#d6e2d9]">Hints unlocked</h2>
            <span className="text-xs font-semibold text-[#82958b]">{hints.length} / 3</span>
          </div>
          <div className="flex flex-col gap-2">
            {hints.map((hint, index) => (
              <div key={index} className="rounded-2xl border border-white/10 bg-[#101d18] p-4">
                <p className="text-sm font-semibold">
                  {hint.type === 'nationality' && ` Nationality: `}
                  {hint.type === 'age_bracket' && ` Age at match: `}
                  {hint.type === 'previous_clubs' && `️ Previous clubs: `}
                  <span className="text-[#c8f36b]">
                    {Array.isArray(hint.value) ? hint.value.join(', ') : hint.value}
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

        <footer className="pb-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-[#52655b]">
          One puzzle. One XI. Every day.
        </footer>
      </div>
    </main>
  )
}