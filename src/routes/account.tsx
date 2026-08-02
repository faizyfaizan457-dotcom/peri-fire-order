import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, History, MapPin, Sparkles, UserCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/config/business";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account & Rewards | Quayside Peri Peri" },
      {
        name: "description",
        content:
          "Sign in to manage your Quayside Peri Peri profile, saved addresses, order history, favourites, loyalty points and marketing preferences.",
      },
      { property: "og:title", content: "My Account — Quayside Peri Peri" },
      { property: "og:description", content: "Order history, favourites, saved addresses and Quayside Rewards." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Account,
});

const PANELS = [
  { icon: UserCircle, title: "Profile", text: "Name, email and phone — editable, with account deletion." },
  { icon: MapPin, title: "Saved addresses", text: "Reuse delivery addresses in one tap." },
  { icon: History, title: "Order history", text: "Every past order with a one-tap Order Again." },
  { icon: Heart, title: "Favourites", text: "Save the meals you always come back to." },
  { icon: Sparkles, title: "Loyalty & vouchers", text: `Earn ${BUSINESS.loyalty.pointsPerPound} points per £1 spent.` },
];

function Account() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl leading-none sm:text-6xl">MY ACCOUNT</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Accounts, loyalty and order history need the secure backend switched on — sign-in, password hashing, order records
        and role-based admin all live there. Ask me to enable it and this becomes a working dashboard.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {PANELS.map((p) => (
          <div key={p.title} className="rounded-3xl border border-border bg-card/60 p-6">
            <p.icon className="size-6 text-gold" aria-hidden />
            <h2 className="mt-3 font-display text-2xl leading-none">{p.title}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild className="rounded-full bg-gradient-fire font-bold uppercase shadow-glow">
          <Link to="/order">Order as a guest</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full border-gold/50 text-gold">
          <Link to="/menu">Browse the menu</Link>
        </Button>
      </div>
    </div>
  );
}
