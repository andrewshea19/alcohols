"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { theme, toggle } = useTheme();

  return (
    <header className="px-4 pt-6 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Are you a Cardinal?")}
            className="border px-2 py-1 font-mono text-sm glow-green-subtle cursor-default"
            style={{ borderColor: "var(--border)", color: "var(--accent)" }}
          >
            EtOH
          </button>
          <h1 className="font-mono text-2xl font-bold tracking-wider" style={{ color: "var(--text)" }}>
            ALCOHOLS
          </h1>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={toggle}
            className="font-mono text-xs min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            style={{ color: "var(--text-secondary)" }}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <Link
            href="/faq"
            className="font-mono text-xs min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            FAQ
          </Link>
        </div>
      </div>
      <p className="mt-2 font-mono text-sm" style={{ color: "var(--text-secondary)" }}>
        ABV &times; Vol ={" "}
        <span className="glow-green-subtle" style={{ color: "var(--accent)" }}>Alcohols</span>
      </p>
    </header>
  );
}
