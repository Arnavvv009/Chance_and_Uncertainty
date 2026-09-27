import React from 'react';

export function ProbabilityDiagram({ diagramInfo, size = 180 }) {
  if (!diagramInfo) return null;

  const { total = 10, fav = 3, favLabel = '', mode = 'basic', total2, fav2, favLabel2, trials } = diagramInfo;

  if (mode === 'compare') {
    return (
      <div className="flex items-center justify-center gap-8 my-2">
        {[{ t: total, f: fav, label: 'Scenario A', color: '#a78bfa' }, { t: total2, f: fav2, label: 'Scenario B', color: '#38bdf8' }].map((s, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 100 100" className="drop-shadow-[0_0_10px_rgba(139,92,246,0.4)]">
              <circle cx="50" cy="50" r="42" fill="rgba(139,92,246,0.12)" stroke={s.color} strokeWidth="4" />
              <text x="50" y="45" textAnchor="middle" fontSize="16" fontWeight="900" fill={s.color}>{s.f}/{s.t}</text>
              <text x="50" y="63" textAnchor="middle" fontSize="9" fontWeight="800" fill="#e2e8f0">favourable</text>
            </svg>
            <span className="font-display font-800 text-xs mt-1" style={{ color: s.color }}>{s.label}</span>
          </div>
        ))}
      </div>
    );
  }

  // Grid of dots representing total outcomes, favourable ones highlighted gold
  const cols = total <= 10 ? Math.min(total, 5) : total <= 25 ? Math.ceil(Math.sqrt(total)) : 8;
  const displayTotal = Math.min(total, 30); // cap visual dots for very large totals (e.g. 52-card deck)
  const displayFav = total > 30 ? Math.round((fav / total) * displayTotal) : fav;
  const rows = Math.ceil(displayTotal / cols);
  const cell = Math.min(20, 150 / cols);

  return (
    <div className="flex flex-col items-center justify-center my-2 gap-2">
      <svg width={size} height={Math.max(90, rows * (cell + 8) + 20)} viewBox={`0 0 ${cols * (cell + 8)} ${rows * (cell + 8) + 10}`}>
        {Array.from({ length: displayTotal }).map((_, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const cx = col * (cell + 8) + cell / 2 + 4;
          const cy = row * (cell + 8) + cell / 2 + 4;
          const isFav = i < displayFav;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={cell / 2.4}
              fill={isFav ? '#facc15' : 'rgba(148,163,184,0.35)'}
              stroke={isFav ? '#b45309' : '#475569'}
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
      <div className="text-center">
        {mode === 'expected' ? (
          <span className="font-display font-900 text-amber-300 text-sm">
            {fav}/{total} {favLabel} · over {trials} trials
          </span>
        ) : (
          <span className="font-display font-900 text-amber-300 text-sm">
            {fav} of {total} are {favLabel}
          </span>
        )}
      </div>
    </div>
  );
}
