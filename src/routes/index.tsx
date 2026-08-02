import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Star, Truck, ShoppingBag, Gift, MapPin, Clock, Phone } from "lucide-react";
import { useState } from "react";

import { ProductCard } from "@/components/site/ProductCard";
import { ProductDialog } from "@/components/site/ProductDialog";
import { Button } from "@/components/ui/button";
import { ALLERGEN_NOTICE, BUSINESS, formatGBP } from "@/config/business";
import { BESTSELLERS, CATEGORIES, IMAGES, PRODUCTS, productsByCategory, type Product } from "@/data/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quayside Peri Peri Gloucester | Halal Fire Grilled Chicken & Burgers" },
      {
        name: "description",
        content:
          "Halal peri peri chicken, gourmet burgers, wings, loaded fries and shakes on Southgate Street, Gloucester. Order online for collection or delivery — 10% off online orders.",
      },
      { property: "og:title", content: "Quayside Peri Peri | Fire Grilled. Full of Flavour." },
      {
        property: "og:description",
        content: "Fire grilled halal peri peri chicken, burgers and loaded fries in Gloucester GL1. Order online now.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: BUSINESS.name,
          servesCuisine: ["Peri Peri", "Halal", "Burgers", "Fast Food"],
          telephone: BUSINESS.phone,
          url: `https://${BUSINESS.website}`,
          priceRange: "££",
          address: {
            "@type": "PostalAddress",
            streetAddress: BUSINESS.address.line1,
            addressLocality: BUSINESS.address.city,
            postalCode: BUSINESS.address.postcode,
            addressCountry: "GB",
          },
          hasMenu: `https://${BUSINESS.website}/menu`,
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [product, setProduct] = useState<Product | null>(null);
  const featured = CATEGORIES.filter((c) => c.image).slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src={IMAGES.chicken}
          alt="Flame grilled peri peri chicken on a hot grill"
          width={1536}
          height={1152}
          className="absolute inset-0 size-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_10%,transparent,var(--background)_70%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {[12, 28, 46, 64, 82].map((left, i) => (
            <span
              key={left}
              className="animate-ember absolute bottom-10 size-1.5 rounded-full bg-gold/70"
              style={{ left: `${left}%`, animationDelay: `${i * 1.3}s` }}
            />
          ))}
        </div>

        <div className="relative mx-auto flex min-h-[86vh] max-w-7xl flex-col justify-center px-4 py-20 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.32em] text-gold">
            <Flame className="size-4" aria-hidden /> Fire Grilled • Halal • Fresh
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-6xl leading-[0.92] sm:text-7xl lg:text-8xl">
            FIRE GRILLED.
            <br />
            <span className="text-gradient-fire">FULL OF FLAVOUR.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Chicken • Burgers • Wraps • Wings • Loaded Fries • Lamb • Desserts
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild className="h-14 rounded-full bg-gradient-fire px-8 font-display text-xl tracking-wide shadow-glow">
              <Link to="/order">ORDER ONLINE</Link>
            </Button>
            <Button asChild variant="outline" className="h-14 rounded-full border-gold/50 px-8 font-display text-xl tracking-wide text-gold">
              <Link to="/menu">VIEW MENU</Link>
            </Button>
          </div>
          <div className="mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5">
            <Gift className="size-4 text-gold" aria-hidden />
            <span className="font-display text-xl tracking-wide text-gold">10% OFF ONLINE ORDERS</span>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y bg-card/50">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-3 lg:px-8">
          {[
            { icon: Flame, title: "100% Halal", text: "Fire grilled to order, never pre-cooked" },
            { icon: Truck, title: "Collection & delivery", text: "Choose your slot at checkout" },
            { icon: ShoppingBag, title: "10% off online", text: "Automatically applied to your basket" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/15">
                <f.icon className="size-5 text-primary" aria-hidden />
              </span>
              <span>
                <span className="block font-semibold">{f.title}</span>
                <span className="text-sm text-muted-foreground">{f.text}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <Section title="EAT THE MENU" kicker="Featured categories">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((c) => (
            <Link
              key={c.id}
              to="/menu"
              hash={c.id}
              className="group relative overflow-hidden rounded-3xl border border-border"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                width={1024}
                height={1024}
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-4 bottom-4">
                <h3 className="font-display text-2xl leading-none">{c.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* BEST SELLERS */}
      <Section title="BEST SELLERS" kicker="What Gloucester orders most">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BESTSELLERS.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={setProduct} />
          ))}
        </div>
      </Section>

      {/* SIGNATURE LOADED FRIES */}
      <Section title="SIGNATURE LOADED FRIES" kicker="Piled high">
        <div className="grid gap-4 sm:grid-cols-3">
          {productsByCategory("loaded-fries").map((p) => (
            <ProductCard key={p.id} product={p} onSelect={setProduct} />
          ))}
        </div>
      </Section>

      {/* NEW ARRIVALS */}
      <Section title="NEW ARRIVALS" kicker="Fresh on the grill">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {productsByCategory("new-arrivals").map((p) => (
            <button
              key={p.id}
              onClick={() => setProduct(p)}
              className="flex items-center justify-between rounded-2xl border border-border bg-card/60 px-4 py-4 text-left transition-colors hover:border-primary/60"
            >
              <span className="font-semibold">{p.name}</span>
              <span className="font-semibold text-gold">{formatGBP(p.sizes[0]!.price)}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* DEALS */}
      <Section title="DEALS & OFFERS" kicker="Save on every order">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "10% OFF", text: "All online orders, applied automatically at checkout." },
            { title: "MAKE IT A MEAL", text: "Add fries and a drink to most mains from £2.50." },
            { title: "MORE COMING", text: "Voucher codes, free delivery and BOGO run from the admin promotions engine." },
          ].map((d) => (
            <div key={d.title} className="rounded-3xl border border-gold/30 bg-gold/5 p-6">
              <h3 className="font-display text-3xl text-gradient-gold">{d.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.text}</p>
            </div>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-6 rounded-full border-gold/50 text-gold">
          <Link to="/deals">See all deals</Link>
        </Button>
      </Section>

      {/* LOYALTY */}
      <Section title="QUAYSIDE REWARDS" kicker="Loyalty programme">
        <div className="rounded-3xl border border-border bg-gradient-violet p-8">
          <p className="max-w-2xl text-muted-foreground">
            Earn {BUSINESS.loyalty.pointsPerPound} points for every £1 spent and redeem against fries, drinks, burgers and
            free delivery. Points, thresholds and expiry are configured by the restaurant.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-4">
            {BUSINESS.loyalty.rewards.map((r) => (
              <li key={r.id} className="rounded-2xl border border-border bg-card/60 p-4">
                <span className="block font-display text-xl">{r.name}</span>
                <span className="text-sm text-gold">{r.points} points</span>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-6 rounded-full bg-gradient-fire font-bold uppercase">
            <Link to="/account">Join rewards</Link>
          </Button>
        </div>
      </Section>

      {/* REVIEWS */}
      <Section title="REVIEWS" kicker="Verified after completed orders">
        <div className="rounded-3xl border border-border bg-card/60 p-8 text-center">
          <div className="flex justify-center gap-1" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 text-gold" />
            ))}
          </div>
          <p className="mt-4 text-muted-foreground">
            Reviews appear here once customers submit them after a completed order and the restaurant approves them. No
            reviews have been invented.
          </p>
        </div>
      </Section>

      {/* LOCATION */}
      <Section title="FIND US" kicker="Southgate Street, Gloucester">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-border bg-card/60 p-6">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 text-primary" aria-hidden />
              <span>
                {BUSINESS.address.line1}
                <br />
                {BUSINESS.address.city}, {BUSINESS.address.postcode}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="size-5 text-primary" aria-hidden />
              <a className="hover:text-gold" href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}>
                {BUSINESS.phone}
              </a>
            </p>
            <p className="flex items-start gap-3 text-sm text-muted-foreground">
              <Clock className="mt-0.5 size-5 text-primary" aria-hidden />
              Opening hours require confirmation from the restaurant and are managed in settings.
            </p>
            <Button asChild variant="outline" className="rounded-full border-gold/50 text-gold">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSINESS.mapsQuery)}`}
                target="_blank"
                rel="noreferrer"
              >
                Get directions
              </a>
            </Button>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border">
            <iframe
              title="Map showing Quayside Peri Peri, 79 Southgate Street, Gloucester"
              src={`https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.mapsQuery)}&output=embed`}
              loading="lazy"
              className="h-72 w-full lg:h-full"
            />
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{ALLERGEN_NOTICE}</p>
      </Section>

      <ProductDialog product={product} open={Boolean(product)} onOpenChange={(o) => !o && setProduct(null)} />
      <span className="hidden">{PRODUCTS.length} products</span>
    </>
  );
}

function Section({ title, kicker, children }: { title: string; kicker?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      {kicker && <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{kicker}</p>}
      <h2 className="mb-7 mt-2 font-display text-4xl leading-none sm:text-5xl">{title}</h2>
      {children}
    </section>
  );
}
