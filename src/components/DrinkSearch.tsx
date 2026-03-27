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

type SortField = "name" | "alcohols";
type SortDir = "asc" | "desc";

export default function DrinkSearch({ onAdd }: DrinkSearchProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<DrinkCategory | "all">("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir(field === "name" ? "asc" : "desc");
    }
  }

  const filtered = useMemo(() => {
    let results = drinks;
    if (activeCategory !== "all") {
      results = results.filter((d) => d.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      results = results.filter((d) => d.name.toLowerCase().includes(q));
    }
    const sorted = results.slice();
    if (sortField === "alcohols") {
      return sorted.sort((a, b) => sortDir === "desc" ? b.alcohols - a.alcohols : a.alcohols - b.alcohols);
    }
    sorted.sort((a, b) => sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    if (activeCategory !== "all" || sortDir === "desc") return sorted;
    const categoryOrder: DrinkCategory[] = ["domestic", "craft", "seltzer", "wine", "spirit", "cocktail"];
    return sorted.sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category));
  }, [query, activeCategory, sortField, sortDir]);

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
            className="absolute right-3 top-1/2 -translate-y-1/2 text-lg cursor-pointer"
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
              className="aspect-square rounded border font-mono transition-colors flex flex-col items-center justify-center cursor-pointer"
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

      <div className="flex justify-end gap-3">
        <button
          onClick={() => handleSort("name")}
          className="font-mono text-xs cursor-pointer"
          style={{ color: sortField === "name" ? "var(--accent)" : "var(--text-secondary)" }}
        >
          Name {sortField === "name" ? (sortDir === "asc" ? "↑" : "↓") : ""}
        </button>
        <button
          onClick={() => handleSort("alcohols")}
          className="font-mono text-xs cursor-pointer"
          style={{ color: sortField === "alcohols" ? "var(--accent)" : "var(--text-secondary)" }}
        >
          Alcohols {sortField === "alcohols" ? (sortDir === "desc" ? "↓" : "↑") : ""}
        </button>
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
