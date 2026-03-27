import { Drink, categoryLabels } from "@/lib/types";

interface DrinkCardProps {
  drink: Drink;
  onAdd: (drink: Drink) => void;
}

export default function DrinkCard({ drink, onAdd }: DrinkCardProps) {
  const cat = categoryLabels[drink.category];

  return (
    <div
      className="card-hover flex items-center justify-between rounded-lg border px-3 py-2"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
    >
      <div className="min-w-0 flex-1">
        <div className="font-medium truncate" style={{ color: "var(--text)" }}>{drink.name}</div>
        <div className="mt-0.5 flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
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
      </div>
      <div className="ml-3 flex items-center gap-2 shrink-0">
        <span className="font-mono text-lg font-bold glow-green" style={{ color: "var(--accent)" }}>
          {drink.alcohols.toFixed(1)}
        </span>
        <button
          onClick={() => onAdd(drink)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-xl font-bold active:scale-95 transition-transform cursor-pointer"
          style={{ backgroundColor: "var(--accent-btn)", color: "var(--accent-btn-text)" }}
          aria-label={`Add ${drink.name}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
