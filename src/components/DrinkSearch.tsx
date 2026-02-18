"use client";

import { useState, useMemo } from "react";
import { drinks } from "@/data/drinks";
import { Drink, DrinkCategory, categoryLabels } from "@/lib/types";
import DrinkCard from "./DrinkCard";

const categories: (DrinkCategory | "all")[] = [
  "all",
  "domestic",
  "craft",
  "seltzer",
  "wine",
  "spirit",
  "cocktail",
];

interface DrinkSearchProps {
  onAdd: (drink: Drink) => void;
}

export default function DrinkSearch({ onAdd }: DrinkSearchProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<DrinkCategory | "all">("all");

  const filtered = useMemo(() => {
    let results = drinks;
    if (activeCategory !== "all") {
      results = results.filter((d) => d.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      results = results.filter((d) => d.name.toLowerCase().includes(q));
    }
    const sorted = results.slice().sort((a, b) => a.name.localeCompare(b.name));
    if (activeCategory !== "all") return sorted;
    // In "All" view, lead with domestic beers then rest by category order
    const categoryOrder: DrinkCategory[] = ["domestic", "craft", "seltzer", "wine", "spirit", "cocktail"];
    return sorted.sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category));
  }, [query, activeCategory]);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
          placeholder="Search drinks..."
          className="w-full rounded-lg border px-4 py-3 font-mono text-base"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-card)",
            color: "var(--text)",
          }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const abbr = cat === "all" ? "All" : categoryLabels[cat].abbr;
          const name = cat === "all" ? null : categoryLabels[cat].name;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="aspect-square rounded border font-mono transition-colors flex flex-col items-center justify-center"
              style={{
                borderColor: isActive ? "var(--accent)" : "var(--border)",
                backgroundColor: isActive ? "var(--accent-filter-bg)" : "var(--bg-card)",
                color: isActive ? "var(--accent)" : "var(--text-secondary)",
              }}
            >
              <span className="text-sm font-bold leading-tight">{abbr}</span>
              {name && (
                <span className="text-[10px] leading-tight opacity-70">{name}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <p className="py-8 text-center font-mono text-sm" style={{ color: "var(--text-secondary)" }}>
            No drinks found.
          </p>
        ) : (
          filtered.map((drink) => (
            <DrinkCard key={drink.id} drink={drink} onAdd={onAdd} />
          ))
        )}
      </div>
    </div>
  );
}
