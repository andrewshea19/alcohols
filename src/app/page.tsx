"use client";

import { useState, useEffect, useCallback } from "react";
import { Drink, SessionDrink } from "@/lib/types";
import Header from "@/components/Header";
import DrinkSearch from "@/components/DrinkSearch";
import Calculator from "@/components/Calculator";
import SessionTracker from "@/components/SessionTracker";

type Tab = "drinks" | "calculator";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("drinks");
  const [session, setSession] = useState<SessionDrink[]>([]);

  const addDrink = useCallback((drink: Drink) => {
    const sessionDrink: SessionDrink = {
      sessionId: `${drink.id}-${Date.now()}`,
      drink,
      addedAt: Date.now(),
    };
    setSession((prev) => [...prev, sessionDrink]);
  }, []);

  const removeDrink = useCallback((sessionId: string) => {
    setSession((prev) => prev.filter((s) => s.sessionId !== sessionId));
  }, []);

  const clearSession = useCallback(() => {
    setSession([]);
  }, []);

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (session.length > 0) {
        e.preventDefault();
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [session.length]);

  return (
    <div className="mx-auto max-w-lg pb-24">
      <Header />

      <div className="mx-4 mb-3 flex rounded-lg border p-1" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
        <button
          onClick={() => setActiveTab("drinks")}
          className="flex-1 rounded-md py-2.5 font-mono text-sm transition-colors min-h-[44px] cursor-pointer"
          style={{
            backgroundColor: activeTab === "drinks" ? "var(--tab-active-bg)" : "transparent",
            color: activeTab === "drinks" ? "var(--text)" : "var(--text-secondary)",
          }}
        >
          Drinks
        </button>
        <button
          onClick={() => setActiveTab("calculator")}
          className="flex-1 rounded-md py-2.5 font-mono text-sm transition-colors min-h-[44px] cursor-pointer"
          style={{
            backgroundColor: activeTab === "calculator" ? "var(--tab-active-bg)" : "transparent",
            color: activeTab === "calculator" ? "var(--text)" : "var(--text-secondary)",
          }}
        >
          Calculator
        </button>
      </div>

      <div className="px-4">
        {activeTab === "drinks" ? (
          <DrinkSearch onAdd={addDrink} />
        ) : (
          <Calculator onAdd={addDrink} />
        )}
      </div>

      <SessionTracker
        session={session}
        onRemove={removeDrink}
        onClear={clearSession}
      />
    </div>
  );
}
