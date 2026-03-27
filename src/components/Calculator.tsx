"use client";

import { useState } from "react";
import { Drink, calculateAlcohols } from "@/lib/types";

interface CalculatorProps {
  onAdd: (drink: Drink) => void;
}

export default function Calculator({ onAdd }: CalculatorProps) {
  const [name, setName] = useState("");
  const [abv, setAbv] = useState("");
  const [volume, setVolume] = useState("");

  const abvNum = parseFloat(abv) || 0;
  const volNum = parseFloat(volume) || 0;
  const alcohols = calculateAlcohols(abvNum, volNum);
  const canAdd = abvNum > 0 && volNum > 0;

  function handleAdd() {
    if (!canAdd) return;
    const drink: Drink = {
      id: `custom-${Date.now()}`,
      name: name.trim() || `Custom (${abvNum}% × ${volNum}oz)`,
      category: "cocktail",
      abv: abvNum,
      volumeOz: volNum,
      alcohols,
    };
    onAdd(drink);
    setName("");
    setAbv("");
    setVolume("");
  }

  return (
    <div className="rounded-lg border p-3" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
      <h2 className="mb-3 font-mono text-sm font-bold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
        Calculator
      </h2>

      <div className="flex flex-col gap-2.5">
        <div>
          <label className="mb-1 block font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
            Name (optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jungle Juice"
            className="w-full rounded-lg border px-4 py-2.5 font-mono text-sm"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--input-bg)", color: "var(--text)" }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
              ABV (%)
            </label>
            <input
              type="number"
              inputMode="decimal"
              value={abv}
              onChange={(e) => setAbv(e.target.value)}
              placeholder="5.0"
              min="0"
              max="100"
              step="0.1"
              className="w-full rounded-lg border px-4 py-2.5 font-mono text-sm"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--input-bg)", color: "var(--text)" }}
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
              Volume (oz)
            </label>
            <input
              type="number"
              inputMode="decimal"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="12"
              min="0"
              step="0.5"
              className="w-full rounded-lg border px-4 py-2.5 font-mono text-sm"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--input-bg)", color: "var(--text)" }}
            />
          </div>
        </div>

        <div className="lcd-panel rounded-lg p-3 text-center">
          <div className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
            Alcohols
          </div>
          <div className="mt-1 font-mono text-4xl font-bold glow-green" style={{ color: "var(--accent)" }}>
            {alcohols.toFixed(1)}
          </div>
        </div>

        <button
          onClick={handleAdd}
          disabled={!canAdd}
          className="min-h-[44px] rounded-lg px-4 py-2.5 font-mono text-sm font-bold transition-all active:scale-95 disabled:opacity-40 disabled:active:scale-100 cursor-pointer disabled:cursor-default"
          style={{ backgroundColor: "var(--accent-btn)", color: "var(--accent-btn-text)" }}
        >
          Add to Log
        </button>
      </div>
    </div>
  );
}
