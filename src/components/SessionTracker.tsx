"use client";

import { useState } from "react";
import { SessionDrink } from "@/lib/types";
import SessionItem from "./SessionItem";

interface SessionTrackerProps {
  session: SessionDrink[];
  onRemove: (sessionId: string) => void;
  onClear: () => void;
}

export default function SessionTracker({
  session,
  onRemove,
  onClear,
}: SessionTrackerProps) {
  const [expanded, setExpanded] = useState(false);

  const total = session.reduce((sum, s) => sum + s.drink.alcohols, 0);
  const totalRounded = Math.round(total * 10) / 10;

  if (session.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {expanded && (
        <div
          className="mx-auto max-w-lg border-x border-t rounded-t-lg max-h-[60vh] overflow-y-auto"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--tab-active-bg)" }}
        >
          <div className="flex items-center justify-between border-b-2 px-4 py-1" style={{ borderColor: "var(--text-secondary)" }}>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
              Log
            </h3>
            <button
              onClick={onClear}
              className="font-mono text-xs min-h-[36px] px-2 cursor-pointer"
              style={{ color: "var(--danger)" }}
            >
              Clear Log
            </button>
          </div>
          {session.map((item) => (
            <SessionItem key={item.sessionId} item={item} onRemove={onRemove} />
          ))}
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full border-t px-4 py-3 cursor-pointer"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--tab-active-bg)" }}
      >
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-sm" style={{ color: "var(--text-secondary)" }}>
            <span className="uppercase tracking-wider">Log</span>
            <span style={{ color: "var(--text)" }}>
              {session.length} drink{session.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="lcd-panel rounded px-3 py-1">
              <span className="font-mono text-lg font-bold glow-green" style={{ color: "var(--accent)" }}>
                {totalRounded.toFixed(1)}
              </span>
            </div>
            <span
              className="text-sm transition-transform duration-200"
              style={{ color: "var(--text-secondary)", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              &#9650;
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
