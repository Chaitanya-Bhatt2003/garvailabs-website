"use client";

import { useId } from "react";
import { Check, Clock3, LayoutGrid, ListChecks, PieChart, Settings2, ShieldCheck } from "lucide-react";

/* ------------------------------------------------------------------ *
 * Original GarvAILabs "Agent Control" surface. Hand-built HTML/CSS/SVG,
 * no screenshots and no images anywhere.
 * ------------------------------------------------------------------ */

const series = [22, 30, 27, 41, 46, 43, 58, 64, 61, 74, 80, 92];

/** Smooth cubic through evenly spaced values. */
function path(values: number[], w: number, h: number, max: number) {
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => [i * step, h - (v / max) * h] as const);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

const W = 300;
const PAD = 4; // room for the end dot, which would otherwise clip at the edge
const H = 74;
const MAX = 104;
const line = path(series, W, H, MAX);

const queue = [
  { id: "TKT-4471", text: "Refund not credited after cancellation", state: "Closed", tone: "ok" },
  { id: "TKT-4478", text: "Wrong size delivered — exchange raised", state: "Closed", tone: "ok" },
  { id: "TKT-4482", text: "GST invoice name correction", state: "With you", tone: "wait" },
];

// Two rows read as "a queue"; three started to read as "a table".
const visibleQueue = queue.slice(0, 2);

export function ProductMock({ framed = false }: { framed?: boolean }) {
  const fillId = `mockFill-${useId().replace(/:/g, "")}`;

  return (
    <div
      className={`min-w-0 max-w-full overflow-hidden bg-surface ${
        framed
          ? "rounded-none border-0 shadow-none"
          : "rounded-xl border border-line shadow-[var(--shadow-md)]"
      }`}
    >
      {/* app bar */}
      <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-3 sm:px-4">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center rounded-md bg-accent font-display text-sm font-bold leading-none text-on-accent"
          >
            g
          </span>
          <span className="text-sm font-semibold">Agent Control</span>
        </div>
        <span className="inline-flex min-w-0 shrink items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-2xs font-semibold text-accent-text">
          <span className="mock-pulse h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span className="truncate">4 agents running</span>
        </span>
      </div>

      <div className="flex">
        {/* rail */}
        <aside className="hidden w-12 shrink-0 flex-col items-center gap-1.5 border-r border-line py-4 sm:flex">
          {[LayoutGrid, ListChecks, PieChart, ShieldCheck, Settings2].map((Icon, i) => (
            <span
              key={i}
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                i === 0 ? "bg-soft text-text" : "text-muted/60"
              }`}
            >
              <Icon size={14} aria-hidden="true" />
            </span>
          ))}
        </aside>

        <div className="min-w-0 flex-1 p-3 sm:p-4">
          {/* stat row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            {[
              { k: "Done today", v: "412" },
              { k: "With a human", v: "6" },
              { k: "First reply", v: "38s" },
            ].map((s) => (
              <div key={s.k} className="min-w-0 rounded-card border border-line bg-soft/60 px-2.5 py-2.5 sm:px-3">
                <p className="text-2xs uppercase leading-tight tracking-[0.08em] text-muted">{s.k}</p>
                <p className="num mt-1 text-xl">{s.v}</p>
              </div>
            ))}
          </div>

          {/* chart */}
          <div className="mt-3 rounded-card border border-line bg-soft/50 p-3.5">
            <div className="mb-2.5 flex items-baseline justify-between">
              <p className="text-xs font-medium">Cases closed by agents</p>
              <p className="num text-xs text-muted">+41% this month</p>
            </div>
            <svg
              viewBox={`0 0 ${W + PAD} ${H + 6}`}
              className="w-full"
              role="img"
              aria-label="Chart showing cases closed by agents rising steadily over twelve weeks"
            >
              <defs>
                <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 1, 2].map((i) => (
                <line
                  key={i}
                  x1="0"
                  x2={W}
                  y1={(H / 2) * i}
                  y2={(H / 2) * i}
                  stroke="var(--border)"
                  strokeWidth="1"
                />
              ))}
              <path
                className="chart-fill"
                d={`${line} L ${W} ${H} L 0 ${H} Z`}
                fill={`url(#${fillId})`}
              />
              <path
                className="chart-draw"
                d={line}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                className="chart-fill"
                cx={W}
                cy={H - (series[series.length - 1] / MAX) * H}
                r="3"
                fill="var(--accent)"
              />
            </svg>
          </div>

          {/* queue */}
          <ul className="mt-3 space-y-2">
            {visibleQueue.map((q) => (
              <li
                key={q.id}
                className="flex items-center gap-3 rounded-card border border-line bg-soft/50 px-3 py-2.5"
              >
                <span className="num hidden text-2xs text-muted sm:block">{q.id}</span>
                <span className="min-w-0 flex-1 truncate text-xs">{q.text}</span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-2xs font-semibold ${
                    q.tone === "ok"
                      ? "bg-accent-soft text-accent-text"
                      : "bg-soft text-muted"
                  }`}
                >
                  {q.state}
                </span>
              </li>
            ))}
          </ul>

          {/* The approval step is the product's thesis, so it sits inside the
              frame rather than floating outside the column. */}
          <div className="mt-3 rounded-card border border-line bg-soft/50 p-3.5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-soft text-muted">
                <Clock3 size={12} aria-hidden="true" />
              </span>
              <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-muted">
                Waiting on you
              </p>
            </div>
            <p className="mt-2.5 text-xs leading-snug">
              Release refund of <span className="num font-semibold">₹4,820</span> — failed UPI
              capture, evidence attached.
            </p>
            <div className="mt-3 flex gap-2">
              <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent py-2 text-2xs font-semibold text-on-accent">
                <Check size={11} strokeWidth={3} aria-hidden="true" /> Approve
              </span>
              <span className="inline-flex flex-1 items-center justify-center rounded-full border border-line-strong py-2 text-2xs font-medium text-muted">
                Hold
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
