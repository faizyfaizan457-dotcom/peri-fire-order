import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/config/business";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Deals & Offers | Quayside Peri Peri Gloucester" },
      {
        name: "description",
        content:
          "Current Quayside Peri Peri offers: 10% off online orders, meal upgrades and loyalty rewards on halal peri peri chicken and burgers in Gloucester.",
      },
      { property: "og:title", content: "Deals & Offers — Quayside Peri Peri" },
      { property: "og:description", content: "10% off online orders, meal deals and Quayside Rewards." },
    ],
  }),
  component: Deals,
});

const LIVE = [
  { title: `${BUSINESS.promotions.onlineDiscountPercent}% OFF ONLINE ORDERS`, text: "Applied automatically to every online basket." },
  { title: "MAKE IT A MEAL", text: "Fries + a drink added to most mains from £2.50." },
];

const ENGINE = [
  "Percentage and fixed-amount discounts",
  "Free delivery and delivery-threshold offers",
  "Buy One Get One",
  "Product and category specific discounts",
  "Minimum-order and first-order discounts",
  "Customer-specific vouchers",
  "Time-limited and day-of-week promotions",
  "Collection-only and delivery-only offers",
];

function Deals() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl leading-none sm:text-6xl">DEALS & OFFERS</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {LIVE.map((d) => (
          <div key={d.title} className="rounded-3xl border border-gold/30 bg-gold/5 p-7">
            <h2 className="font-display text-3xl text-gradient-gold">{d.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{d.text}</p>
          </div>
        ))}
      </div>

      <section className="mt-12 rounded-3xl border border-border bg-card/60 p-7">
        <h2 className="font-display text-3xl">PROMOTION ENGINE</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          These promotion types are supported by the pricing model and are created and disabled from the admin dashboard —
          no code changes needed. Real campaign values (amounts, codes, dates) need to be set by the restaurant.
        </p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {ENGINE.map((e) => (
            <li key={e} className="rounded-xl border border-border bg-background/50 px-4 py-3 text-sm">
              {e}
            </li>
          ))}
        </ul>
      </section>

      <Button asChild className="mt-8 h-12 rounded-full bg-gradient-fire px-8 font-bold uppercase shadow-glow">
        <Link to="/order">Order online</Link>
      </Button>
    </div>
  );
}
