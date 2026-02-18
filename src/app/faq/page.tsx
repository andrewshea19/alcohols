import Link from "next/link";

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-sm transition-colors min-h-[44px]"
        style={{ color: "var(--text-secondary)" }}
      >
        &larr; Back
      </Link>

      <h1 className="mt-4 font-mono text-2xl font-bold tracking-wider" style={{ color: "var(--text)" }}>
        FAQ
      </h1>

      <div className="mt-6 flex flex-col gap-6">
        <section>
          <h2 className="font-mono text-sm font-bold uppercase tracking-wider glow-green-subtle" style={{ color: "var(--accent)" }}>
            What are &ldquo;Alcohols&rdquo;?
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            &ldquo;Alcohols&rdquo; is a simple unit that represents the total amount of alcohol
            in a drink. It combines two things that matter &mdash; how strong a drink is (ABV)
            and how much of it you&rsquo;re drinking (volume) &mdash; into a single number
            you can track across different drink types.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-sm font-bold uppercase tracking-wider glow-green-subtle" style={{ color: "var(--accent)" }}>
            How is it calculated?
          </h2>
          <div className="mt-3 lcd-panel rounded-lg p-4">
            <p className="font-mono text-center text-lg" style={{ color: "var(--text)" }}>
              Alcohols = ABV &times; Volume (oz)
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            ABV is used as-is (e.g. 5.0 for a 5% beer, not 0.05). Multiply by the
            volume in ounces and you get the alcohols number. Results are rounded to
            one decimal place.
          </p>
          <div className="mt-3 rounded-lg border p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
            <p className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
              Examples
            </p>
            <ul className="mt-2 flex flex-col gap-2 text-sm" style={{ color: "var(--text)" }}>
              <li className="flex justify-between">
                <span style={{ color: "var(--text-secondary)" }}>Bud Light (4.2% &times; 12oz)</span>
                <span className="font-mono" style={{ color: "var(--accent)" }}>50.4</span>
              </li>
              <li className="flex justify-between">
                <span style={{ color: "var(--text-secondary)" }}>Cabernet (14% &times; 5oz)</span>
                <span className="font-mono" style={{ color: "var(--accent)" }}>70.0</span>
              </li>
              <li className="flex justify-between">
                <span style={{ color: "var(--text-secondary)" }}>Vodka shot (40% &times; 1.5oz)</span>
                <span className="font-mono" style={{ color: "var(--accent)" }}>60.0</span>
              </li>
              <li className="flex justify-between">
                <span style={{ color: "var(--text-secondary)" }}>Margarita (13% &times; 6oz)</span>
                <span className="font-mono" style={{ color: "var(--accent)" }}>78.0</span>
              </li>
            </ul>
          </div>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            This makes it easy to compare across categories. A light beer and a shot
            of vodka are both around 50&ndash;60 alcohols, even though one is 12oz at 4%
            and the other is 1.5oz at 40%.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-sm font-bold uppercase tracking-wider glow-green-subtle" style={{ color: "var(--accent)" }}>
            What are the categories?
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              { abbr: "Be", name: "Beer", desc: "Domestic & macro lagers" },
              { abbr: "Cr", name: "Craft", desc: "Craft & import beers" },
              { abbr: "Sz", name: "Seltzer", desc: "Hard seltzers & ciders" },
              { abbr: "Wi", name: "Wine", desc: "Wine by the glass" },
              { abbr: "Sp", name: "Spirit", desc: "Shots & neat pours" },
              { abbr: "Ct", name: "Cocktail", desc: "Mixed drinks" },
            ].map((cat) => (
              <div
                key={cat.abbr}
                className="flex items-start gap-2 rounded-lg border p-3"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
              >
                <span
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center border font-mono text-xs"
                  style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                >
                  {cat.abbr}
                </span>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{cat.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-mono text-sm font-bold uppercase tracking-wider glow-green-subtle" style={{ color: "var(--accent)" }}>
            How does the log work?
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Every drink you add goes into your Log at the bottom of the screen.
            It keeps a running total of your alcohols for the session. You can expand
            the log to see each drink, remove individual entries, or clear the whole thing.
          </p>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Your session lives only in your browser tab. Nothing is saved to a server.
            If you close or refresh the tab, your log resets. You&rsquo;ll get a warning
            if you try to leave with drinks in your log.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-sm font-bold uppercase tracking-wider glow-green-subtle" style={{ color: "var(--accent)" }}>
            Can I add a custom drink?
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Yes. Switch to the Calculator tab, enter the ABV and volume, optionally
            give it a name, and hit &ldquo;Add to Log.&rdquo; The alcohols value is
            calculated live as you type.
          </p>
        </section>
      </div>

      <div className="pb-8" />
    </div>
  );
}
