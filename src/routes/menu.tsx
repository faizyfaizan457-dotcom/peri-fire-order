import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { ProductCard } from "@/components/site/ProductCard";
import { ProductDialog } from "@/components/site/ProductDialog";
import { Input } from "@/components/ui/input";
import { ALLERGEN_NOTICE, formatGBP } from "@/config/business";
import { CATEGORIES, productsByCategory, searchProducts, type Product } from "@/data/menu";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu | Peri Peri Chicken, Burgers & Loaded Fries — Gloucester" },
      {
        name: "description",
        content:
          "Full Quayside Peri Peri menu: fire grilled halal chicken, wings, gourmet beef burgers, lamb, loaded fries, sides, kids meals, shakes and desserts with prices.",
      },
      { property: "og:title", content: "Quayside Peri Peri Menu — Gloucester" },
      { property: "og:description", content: "Fire grilled chicken, burgers, wings, loaded fries and shakes. Order online." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [query, setQuery] = useState("");
  const results = searchProducts(query);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Fire Grilled • Halal • Fresh</p>
      <h1 className="mt-2 font-display text-5xl leading-none sm:text-6xl">OUR MENU</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Everything is grilled to order. Tap any item to choose size, spice level, toppings and meal upgrades.
      </p>

      <div className="sticky top-16 z-30 -mx-4 mt-6 bg-background/85 px-4 py-3 backdrop-blur sm:top-18">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search chicken, burger, fries, shake, lamb…"
          aria-label="Search the menu"
          className="h-11"
        />
        <nav aria-label="Menu categories" className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="whitespace-nowrap rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              {c.name}
            </a>
          ))}
        </nav>
      </div>

      {query ? (
        <section className="mt-8">
          <h2 className="font-display text-3xl">SEARCH RESULTS</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} onSelect={setProduct} />
            ))}
          </div>
          {results.length === 0 && <p className="mt-6 text-muted-foreground">No matches for “{query}”.</p>}
        </section>
      ) : (
        CATEGORIES.map((c) => {
          const items = productsByCategory(c.id);
          return (
            <section key={c.id} id={c.id} className="scroll-mt-44 pt-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{c.tagline}</p>
              <h2 className="mt-2 font-display text-4xl leading-none">{c.name.toUpperCase()}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) =>
                  p.image ? (
                    <ProductCard key={p.id} product={p} onSelect={setProduct} />
                  ) : (
                    <button
                      key={p.id}
                      onClick={() => setProduct(p)}
                      className="flex flex-col items-start gap-1 rounded-2xl border border-border bg-card/60 px-4 py-4 text-left transition-colors hover:border-primary/60"
                    >
                      <span className="flex w-full items-center justify-between gap-3">
                        <span className="font-display text-xl leading-none">{p.name}</span>
                        <span className="whitespace-nowrap font-semibold text-gold">
                          {p.sizes.map((s) => formatGBP(s.price)).join(" / ")}
                        </span>
                      </span>
                      {p.description && <span className="text-sm text-muted-foreground">{p.description}</span>}
                      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                        {p.sizes.length > 1 ? p.sizes.map((s) => s.label).join(" · ") : "Tap to customise"}
                      </span>
                    </button>
                  ),
                )}
              </div>
            </section>
          );
        })
      )}

      <p className="mt-14 rounded-2xl border border-border bg-card/60 p-5 text-sm text-muted-foreground">
        {ALLERGEN_NOTICE} Per-dish allergen data is configured by the restaurant in the admin dashboard and is not shown
        until confirmed.
      </p>

      <ProductDialog product={product} open={Boolean(product)} onOpenChange={(o) => !o && setProduct(null)} />
    </div>
  );
}
