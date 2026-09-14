'use client'

import { useMemo, useState } from 'react'

const players = [
  { name: 'Jerzy Dudek', role: 'GK', x: '50%', y: '88%' },
  { name: 'Steve Finnan', role: 'LB', x: '12%', y: '68%' },
  { name: 'Jamie Carragher', role: 'CB', x: '37%', y: '72%' },
  { name: 'Sami Hyypia', role: 'CB', x: '63%', y: '72%' },
  { name: 'Djimi Traore', role: 'RB', x: '88%', y: '68%' },
  { name: 'Steven Gerrard', role: 'CM', x: '23%', y: '48%' },
  { name: 'Xabi Alonso', role: 'CM', x: '50%', y: '44%' },
  { name: 'Harry Kewell', role: 'LW', x: '84%', y: '22%' },
  { name: 'Milan Baros', role: 'ST', x: '50%', y: '14%' },
  { name: 'Luis Garcia', role: 'RW', x: '16%', y: '22%' },
]

const answer = 'Xabi Alonso'
const searchPlayers = ['Xabi Alonso', 'Steven Gerrard', 'Luis Garcia', 'Andrea Pirlo', 'Frank Lampard']

export default function Page() {
  const [query, setQuery] = useState('')
  const [attempts, setAttempts] = useState([])
  const [finished, setFinished] = useState(false)
  const [copied, setCopied] = useState(false)

  const suggestions = useMemo(() => {
    if (!query.trim()) return []
    return searchPlayers.filter((name) => name.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  function submitGuess(value = query) {
    const guess = value.trim()
    if (!guess || finished || attempts.length >= 5) return
    const nextAttempts = [...attempts, guess]
    setAttempts(nextAttempts)
    setQuery('')
    if (guess.toLowerCase() === answer.toLowerCase() || nextAttempts.length === 5) setFinished(true)
  }

  async function shareResult() {
    try {
      await navigator.clipboard.writeText(`XI Daily #1 ⚽\n⬛⬛🟩\nxidaily.com`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#07110e] px-4 py-5 text-white sm:py-8">
      <div className="mx-auto flex w-full max-w-[480px] flex-col gap-5">
        <header className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2"><span className="grid size-8 place-items-center rounded-xl bg-[#c8f36b] text-sm font-black text-[#102016]">XI</span><h1 className="text-xl font-black tracking-tight">XI Daily</h1></div>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-[#82958b]">14 September 2026 · Daily football puzzle</p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-right"><p className="text-[10px] font-bold uppercase tracking-widest text-[#82958b]">Easy</p><p className="text-sm font-bold text-[#c8f36b]">Puzzle #1</p></div>
        </header>

        <section className="rounded-2xl border border-white/10 bg-[#101d18] px-4 py-3"><p className="text-sm font-bold">Liverpool <span className="text-[#82958b]">vs</span> AC Milan</p><p className="mt-1 text-xs text-[#82958b]">UEFA Champions League Final · 2004/05</p><p className="mt-1 text-xs font-semibold text-[#c8f36b]">The Miracle of Istanbul · 4-3-3</p></section>

        <section aria-label="Football formation" className="relative aspect-[0.72] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#27804f] to-[#145633] p-3 shadow-2xl shadow-black/30">
          <div className="pointer-events-none absolute inset-3 rounded-[20px] border border-white/25" /><div className="pointer-events-none absolute left-1/2 top-3 bottom-3 w-px -translate-x-1/2 bg-white/20" /><div className="pointer-events-none absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" /><div className="pointer-events-none absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60" /><div className="pointer-events-none absolute left-1/2 top-3 h-20 w-36 -translate-x-1/2 rounded-b-[80px] border border-t-0 border-white/20" /><div className="pointer-events-none absolute left-1/2 bottom-3 h-20 w-36 -translate-x-1/2 rounded-t-[80px] border border-b-0 border-white/20" />
          {players.filter((player) => player.name !== answer).map((player) => <div key={player.name} className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: player.x, top: player.y }}><div className="mx-auto grid size-10 place-items-center rounded-full border-2 border-white/80 bg-[#f5f8ee] text-[9px] font-black text-[#194b31] shadow-lg sm:size-11">{player.role}</div><p className="mt-1 whitespace-nowrap text-[9px] font-bold text-white drop-shadow-md sm:text-[10px]">{player.name}</p></div>)}
          <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 text-center">{finished ? <><div className="mx-auto grid size-12 place-items-center rounded-full border-2 border-[#c8f36b] bg-[#f5f8ee] text-[9px] font-black text-[#194b31] shadow-lg">CM</div><p className="mt-2 whitespace-nowrap rounded-full bg-[#102a1d]/80 px-2 py-1 text-[10px] font-bold text-[#e6f8c5]">{answer}</p></> : <><div className="mx-auto grid size-12 animate-pulse place-items-center rounded-full border-2 border-[#c8f36b] bg-[#173e2a] text-xl font-black text-[#c8f36b] shadow-[0_0_0_7px_rgba(200,243,107,0.12)]">?</div><p className="mt-2 rounded-full bg-[#102a1d]/75 px-2 py-1 text-[10px] font-bold text-[#e6f8c5]">CM2 · Missing</p></>}</div>
        </section>

        {!finished ? <><section className="relative"><label htmlFor="player-search" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#82958b]">Who&apos;s missing?</label><div className="flex items-center rounded-2xl border border-white/10 bg-[#101d18] px-4 transition focus-within:border-[#c8f36b]/60 focus-within:ring-4 focus-within:ring-[#c8f36b]/10"><span className="mr-3 text-lg text-[#82958b]">⌕</span><input id="player-search" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.nativeEvent.isComposing && event.keyCode !== 229) submitGuess() }} placeholder="Search for a player..." className="min-w-0 flex-1 bg-transparent py-4 text-sm font-medium outline-none placeholder:text-[#5d7168]" /><button onClick={() => submitGuess()} disabled={!query.trim()} className="rounded-xl bg-[#c8f36b] px-3 py-2 text-xs font-black text-[#122218] transition hover:bg-[#ddff91] disabled:cursor-not-allowed disabled:opacity-40">Guess</button></div>{suggestions.length > 0 && <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#16251e] p-1 shadow-xl">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => submitGuess(suggestion)} className="block w-full rounded-xl px-3 py-3 text-left text-sm font-semibold hover:bg-white/10">{suggestion}</button>)}</div>}</section><section aria-label="Guess attempts" className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#101d18] px-4 py-3"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#82958b]">Attempts</p><p className="mt-1 text-sm font-bold">{5 - attempts.length} guesses left</p></div><div className="flex gap-2">{[0, 1, 2, 3, 4].map((index) => <div key={index} className={`size-3 rounded-full border ${index < attempts.length ? 'border-[#c8f36b] bg-[#c8f36b]' : 'border-white/20 bg-transparent'}`} aria-label={index < attempts.length ? 'Used guess' : 'Remaining guess'} />)}</div></section></> : <section className="rounded-[28px] border border-[#c8f36b]/25 bg-[#14271c] p-5 text-center shadow-xl shadow-[#c8f36b]/5"><p className="text-3xl font-black text-[#c8f36b]">✓</p><p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-[#c8f36b]">Puzzle complete</p><h2 className="mt-2 text-3xl font-black tracking-tight">The missing player was {answer}</h2><p className="mt-2 text-sm text-[#9eb2a6]">The midfield metronome who helped complete Liverpool&apos;s comeback.</p><div className="mt-5 grid grid-cols-2 gap-2"><div className="rounded-2xl bg-black/15 p-3"><p className="text-2xl font-black text-white">{attempts.length}/5</p><p className="text-[10px] font-bold uppercase tracking-widest text-[#82958b]">Attempts used</p></div><div className="rounded-2xl bg-black/15 p-3"><p className="text-2xl font-black text-[#c8f36b]">3</p><p className="text-[10px] font-bold uppercase tracking-widest text-[#82958b]">Day streak</p></div></div><button onClick={shareResult} className="mt-4 w-full rounded-2xl bg-[#c8f36b] py-3.5 text-sm font-black text-[#122218] transition hover:bg-[#ddff91]">{copied ? 'Result copied' : 'Share your result'}</button><p className="mt-4 text-xs text-[#82958b]">Next puzzle in <span className="font-bold text-white">08:42:16</span></p></section>}

        <section><div className="mb-3 flex items-center justify-between"><h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#d6e2d9]">Hints unlocked</h2><span className="text-xs font-semibold text-[#82958b]">{Math.min(attempts.length >= 4 ? 3 : attempts.length >= 3 ? 2 : attempts.length >= 2 ? 1 : 0, 3)} / 3</span></div><div className="flex flex-col gap-2">{attempts.length >= 2 && <div className="rounded-2xl border border-white/10 bg-[#101d18] p-4"><p className="text-sm font-semibold">🌍 Nationality: <span className="text-[#c8f36b]">Spanish</span></p></div>}{attempts.length >= 3 && <div className="rounded-2xl border border-white/10 bg-[#101d18] p-4"><p className="text-sm font-semibold">📅 Age at match: <span className="text-[#c8f36b]">24-28 (prime years)</span></p></div>}{attempts.length >= 4 && <div className="rounded-2xl border border-white/10 bg-[#101d18] p-4"><p className="text-sm font-semibold">🏟️ Previous clubs: <span className="text-[#c8f36b]">Real Sociedad, Liverpool</span></p></div>}{attempts.length < 2 && <p className="rounded-2xl border border-dashed border-white/10 px-4 py-5 text-center text-xs text-[#82958b]">Make two guesses to unlock your first hint.</p>}</div></section>
        <footer className="pb-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-[#52655b]">One puzzle. One XI. Every day.</footer>
      </div>
    </main>
  )
}
