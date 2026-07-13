import { useCallback, useEffect, useRef, useState } from "react";

const tg = typeof window !== "undefined" ? window.Telegram?.WebApp : undefined;

const GAME_MS = 20000;
const COLS = 4;
const ROWS = 4;
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => i);
const MAX_BUGS = 4;
const GOLD_CHANCE = 0.12;
const BEST_KEY = "tg-debug-dash-best";

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function impact(style) {
  tg?.HapticFeedback?.impactOccurred?.(style);
}

export default function TgGame() {
  const [phase, setPhase] = useState("idle"); // idle | playing | over
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_MS / 1000);
  const [bugs, setBugs] = useState([]);
  const [best, setBest] = useState(readBest);
  const [isNewBest, setIsNewBest] = useState(false);

  const scoreRef = useRef(0);
  const bestRef = useRef(best);
  const idRef = useRef(0);
  // bugsRef is the authoritative game state; setBugs only mirrors it for
  // rendering. All mutation goes through commitBugs so the interval and the
  // tap handlers never fight over a functional updater (which StrictMode
  // double-invokes — that silently broke spawning before).
  const bugsRef = useRef([]);

  useEffect(() => {
    bestRef.current = best;
  }, [best]);

  const commitBugs = useCallback((updater) => {
    const nextBugs =
      typeof updater === "function" ? updater(bugsRef.current) : updater;
    bugsRef.current = nextBugs;
    setBugs(nextBugs);
  }, []);

  const start = useCallback(() => {
    scoreRef.current = 0;
    idRef.current = 0;
    setScore(0);
    commitBugs([]);
    setTimeLeft(GAME_MS / 1000);
    setIsNewBest(false);
    setPhase("playing");
    impact("medium");
  }, [commitBugs]);

  // ── Game engine: one 100ms loop drives the clock, spawns and despawns ──
  useEffect(() => {
    if (phase !== "playing") return undefined;
    const startedAt = Date.now();
    let lastSpawn = Date.now();

    const loop = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const remaining = GAME_MS - elapsed;
      setTimeLeft(Math.max(0, Math.ceil(remaining / 1000)));

      if (remaining <= 0) {
        clearInterval(loop);
        commitBugs([]);
        const finalScore = scoreRef.current;
        setPhase("over");
        if (finalScore > bestRef.current) {
          setIsNewBest(true);
          setBest(finalScore);
          try {
            localStorage.setItem(BEST_KEY, String(finalScore));
          } catch {
            /* private mode — best just won't persist */
          }
        }
        tg?.HapticFeedback?.notificationOccurred?.("success");
        return;
      }

      const now = Date.now();
      let next = bugsRef.current.filter((b) => b.dead || now - b.bornAt < b.life);

      // Spawn gap ramps from ~880ms down to ~430ms across the round
      const spawnGap = Math.max(430, 880 - elapsed / 45);
      const liveCount = next.filter((b) => !b.dead).length;
      if (now - lastSpawn > spawnGap && liveCount < MAX_BUGS) {
        const occupied = new Set(next.map((b) => b.cell));
        const free = CELLS.filter((c) => !occupied.has(c));
        if (free.length) {
          lastSpawn = now;
          idRef.current += 1;
          const gold = Math.random() < GOLD_CHANCE;
          next = [
            ...next,
            {
              id: idRef.current,
              cell: free[Math.floor(Math.random() * free.length)],
              gold,
              bornAt: now,
              life: gold ? 850 : 1050,
              dead: false,
            },
          ];
        }
      }

      commitBugs(next);
    }, 100);

    return () => clearInterval(loop);
  }, [phase, commitBugs]);

  const squash = (bug) => {
    if (bug.dead) return;
    scoreRef.current += bug.gold ? 3 : 1;
    setScore(scoreRef.current);
    commitBugs((prev) =>
      prev.map((b) => (b.id === bug.id ? { ...b, dead: true } : b)),
    );
    impact(bug.gold ? "rigid" : "light");
  };

  const removeBug = (id) => {
    commitBugs((prev) => prev.filter((b) => b.id !== id));
  };

  const bugByCell = new Map();
  bugs.forEach((b) => bugByCell.set(b.cell, b));

  return (
    <div className="tg-game">
      {phase === "idle" && (
        <div className="tg-game-intro">
          <div className="tg-game-emoji" aria-hidden="true">🐛</div>
          <h2 className="tg-game-title">Debug Dash</h2>
          <p className="tg-game-desc">
            Bugs are shipping to prod. Squash as many as you can in 20 seconds —
            🐞 gold bugs are worth 3 points.
          </p>
          {best > 0 && <p className="tg-game-best">Best: {best}</p>}
          <button className="tg-submit tg-game-btn" type="button" onClick={start}>
            Start
          </button>
        </div>
      )}

      {phase === "playing" && (
        <>
          <div className="tg-game-hud">
            <div className="tg-game-stat">
              <span>Time</span>
              <b className={timeLeft <= 5 ? "is-low" : ""}>{timeLeft}s</b>
            </div>
            <div className="tg-game-stat tg-game-stat--right">
              <span>Score</span>
              <b>{score}</b>
            </div>
          </div>

          <div className="tg-game-grid">
            {CELLS.map((c) => {
              const bug = bugByCell.get(c);
              return (
                <div className="tg-game-cell" key={c}>
                  {bug && (
                    <button
                      type="button"
                      className={`tg-bug${bug.gold ? " is-gold" : ""}${bug.dead ? " is-dead" : ""}`}
                      onClick={() => squash(bug)}
                      onAnimationEnd={
                        bug.dead ? () => removeBug(bug.id) : undefined
                      }
                      aria-label="Squash bug"
                      tabIndex={-1}
                    >
                      {bug.gold ? "🐞" : "🐛"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {phase === "over" && (
        <div className="tg-game-over">
          <p className="tg-game-over-label">Time&apos;s up!</p>
          <div className="tg-game-score-big">{score}</div>
          {isNewBest ? (
            <p className="tg-game-newbest">🏆 New best!</p>
          ) : (
            <p className="tg-game-best">Best: {best}</p>
          )}
          <button className="tg-submit tg-game-btn" type="button" onClick={start}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
