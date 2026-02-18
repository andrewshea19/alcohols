"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

type EggStep = null | "ask" | "input" | "prove" | "error";

export default function Header() {
  const { theme, toggle } = useTheme();
  const [eggStep, setEggStep] = useState<EggStep>(null);
  const [eggInput, setEggInput] = useState("");

  function handleNext() {
    if (eggStep === "ask") {
      setEggInput("");
      setEggStep("input");
    } else if (eggStep === "input") {
      if (eggInput.trim().toLowerCase() === "you bet your sweet ass i am") {
        setEggStep("prove");
      } else {
        setEggStep("error");
      }
    }
  }

  function handleClose() {
    setEggStep(null);
    setEggInput("");
  }

  return (
    <header className="px-4 pt-6 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEggStep("ask")}
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

      {eggStep && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <div className="w-full max-w-sm rounded-lg border p-5" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>

            {eggStep === "ask" && (
              <>
                <p className="font-mono text-lg text-center" style={{ color: "var(--text)" }}>
                  Are you a Cardinal?
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={handleClose}
                    className="flex-1 min-h-[44px] rounded-lg border font-mono text-sm"
                    style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                  >
                    Close
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 min-h-[44px] rounded-lg font-mono text-sm font-bold"
                    style={{ backgroundColor: "var(--accent-btn)", color: "var(--accent-btn-text)" }}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {eggStep === "input" && (
              <>
                <input
                  type="text"
                  value={eggInput}
                  onChange={(e) => setEggInput(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 font-mono text-sm"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--input-bg)", color: "var(--text)" }}
                  autoFocus
                />
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={handleClose}
                    className="flex-1 min-h-[44px] rounded-lg border font-mono text-sm"
                    style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                  >
                    Close
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 min-h-[44px] rounded-lg font-mono text-sm font-bold"
                    style={{ backgroundColor: "var(--accent-btn)", color: "var(--accent-btn-text)" }}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {eggStep === "prove" && (
              <>
                <p className="font-mono text-lg text-center" style={{ color: "var(--text)" }}>
                  Then prove it
                </p>
                <div className="mt-4">
                  <button
                    onClick={handleClose}
                    className="w-full min-h-[44px] rounded-lg border font-mono text-sm"
                    style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                  >
                    Close
                  </button>
                </div>
              </>
            )}

            {eggStep === "error" && (
              <>
                <p className="font-mono text-lg text-center" style={{ color: "var(--danger)" }}>
                  Finish your drink.
                </p>
                <div className="mt-4">
                  <button
                    onClick={handleClose}
                    className="w-full min-h-[44px] rounded-lg border font-mono text-sm"
                    style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                  >
                    Close
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </header>
  );
}
