import { Link } from "@tanstack/react-router";
import { Flame, Phone, Smartphone, MapPin } from "lucide-react";

import { ALLERGEN_NOTICE, BUSINESS } from "@/config/business";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/order", label: "Order Online" },
  { to: "/deals", label: "Deals" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
  { to: "/allergens", label: "Allergens" },
  { to: "/refunds", label: "Refund Policy" },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-gradient-violet pb-28 pt-14 lg:pb-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-fire">
              <Flame className="size-5 text-primary-foreground" aria-hidden />
            </span>
            <span className="font-display text-2xl">
              QUAYSIDE <span className="text-gradient-gold">PERI PERI</span>
            </span>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">{BUSINESS.tagline}</p>
          <address className="mt-5 space-y-2 text-sm not-italic text-muted-foreground">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 text-primary" aria-hidden />
              <span>
                {BUSINESS.address.line1}
                <br />
                {BUSINESS.address.city}
                <br />
                {BUSINESS.address.postcode}
              </span>
            </p>
            <p>
              <a className="flex items-center gap-2 hover:text-foreground" href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}>
                <Phone className="size-4 text-primary" aria-hidden /> {BUSINESS.phone}
              </a>
            </p>
            <p>
              <a className="flex items-center gap-2 hover:text-foreground" href={`tel:${BUSINESS.mobile.replace(/\s/g, "")}`}>
                <Smartphone className="size-4 text-primary" aria-hidden /> {BUSINESS.mobile}
              </a>
            </p>
          </address>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-sm">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="text-muted-foreground transition-colors hover:text-gold">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p className="rounded-xl border border-border/60 bg-card/60 p-4">
            <span className="block font-semibold text-foreground">Allergen notice</span>
            {ALLERGEN_NOTICE}
          </p>
          <p>
            Opening hours, delivery fees and social accounts are managed in settings and require confirmation from the
            restaurant before launch.
          </p>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl px-4 text-xs text-muted-foreground lg:px-8">
        © {new Date().getFullYear()} {BUSINESS.name} · {BUSINESS.website}
      </p>
    </footer>
  );
}
