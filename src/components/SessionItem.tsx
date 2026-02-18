import { SessionDrink, categoryLabels } from "@/lib/types";

interface SessionItemProps {
  item: SessionDrink;
  onRemove: (sessionId: string) => void;
}

export default function SessionItem({ item, onRemove }: SessionItemProps) {
  const cat = categoryLabels[item.drink.category];

  return (
    <div className="flex items-center justify-between border-b-2 px-4 py-3" style={{ borderColor: "var(--text-secondary)" }}>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center justify-center border px-1 py-0.5 font-mono text-[10px] shrink-0"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
          >
            {cat.abbr}
          </span>
          <span className="text-sm truncate" style={{ color: "var(--text)" }}>
            {item.drink.name}
          </span>
        </div>
        <div className="mt-0.5 font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
          {item.drink.abv}% &middot; {item.drink.volumeOz}oz
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-bold glow-green-subtle" style={{ color: "var(--accent)" }}>
          {item.drink.alcohols.toFixed(1)}
        </span>
        <button
          onClick={() => onRemove(item.sessionId)}
          className="flex h-8 w-8 items-center justify-center rounded transition-colors"
          style={{ color: "var(--text-secondary)" }}
          aria-label={`Remove ${item.drink.name}`}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
