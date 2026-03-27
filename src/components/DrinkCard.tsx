import { Drink, categoryLabels } from "@/lib/types";

interface DrinkCardProps {
  drink: Drink;
  onAdd: (drink: Drink) => void;
}

export default function DrinkCard({ drink, onAdd }: DrinkCardProps) {
  const cat = categoryLabels[drink.category];

  return (
    <div
      className="card-hover flex items-center justify-between rounded-lg border px-4 py-2.5"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
    >
      <div className="min-w-0 flex-1">
        <div className="font-medium truncate" style={{ color: "var(--text)" }}>{drink.name}</div>
        <div className="mt-1 flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          <span
            className="inline-flex items-center justify-center border px-1.5 py-0.5 font-mono text-xs shrink-0"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
          >
            {cat.abbr}
          </span>
          <span className="truncate">
            {drink.abv}% &middot; {drink.volumeOz}oz
          </span>
        </div>
        <div className="mt-1 font-mono text-lg font-bold glow-green" style={{ color: "var(--accent)" }}>
          {drink.alcohols.toFixed(1)}
        </div>
      </div>
      <button
        onClick={() => onAdd(drink)}
        className="ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xl font-bold active:scale-95 transition-transform cursor-pointer"
        style={{ backgroundColor: "var(--accent-btn)", color: "var(--accent-btn-text)" }}
        aria-label={`Add ${drink.name}`}
      >
        +
      </button>
    </div>
  );
}
