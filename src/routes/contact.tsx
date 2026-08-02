import { createFileRoute } from "@tanstack/react-router";
import { Phone, Smartphone, MapPin, Globe, Instagram, Facebook } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ALLERGEN_NOTICE, BUSINESS } from "@/config/business";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Find Us | Quayside Peri Peri, Southgate Street Gloucester" },
      {
        name: "description",
        content:
          "Call Quayside Peri Peri on 01452 526623 or visit 79 Southgate Street, Gloucester GL1 1UB. Get directions, phone numbers and contact details.",
      },
      { property: "og:title", content: "Contact Quayside Peri Peri — Gloucester GL1 1UB" },
      { property: "og:description", content: "79 Southgate Street, Gloucester. Call 01452 526623." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: BUSINESS.name,
          telephone: BUSINESS.phone,
          url: `https://${BUSINESS.website}`,
          address: {
            "@type": "PostalAddress",
            streetAddress: BUSINESS.address.line1,
            addressLocality: BUSINESS.address.city,
            postalCode: BUSINESS.address.postcode,
            addressCountry: "GB",
          },
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const hasSocial = Object.values(BUSINESS.social).some(Boolean);
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl leading-none sm:text-6xl">CONTACT & FIND US</h1>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="space-y-5 rounded-3xl border border-border bg-card/60 p-7">
          <p className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-5 text-primary" aria-hidden />
            <span>
              {BUSINESS.address.line1}
              <br />
              {BUSINESS.address.city}
              <br />
              {BUSINESS.address.postcode}
            </span>
          </p>
          <p className="flex items-center gap-3">
            <Phone className="size-5 text-primary" aria-hidden />
            <a className="hover:text-gold" href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}>
              {BUSINESS.phone}
            </a>
          </p>
          <p className="flex items-center gap-3">
            <Smartphone className="size-5 text-primary" aria-hidden />
            <a className="hover:text-gold" href={`tel:${BUSINESS.mobile.replace(/\s/g, "")}`}>
              {BUSINESS.mobile}
            </a>
          </p>
          <p className="flex items-center gap-3">
            <Globe className="size-5 text-primary" aria-hidden />
            <a className="hover:text-gold" href={`https://${BUSINESS.website}`} target="_blank" rel="noreferrer">
              {BUSINESS.website}
            </a>
          </p>
          <Button asChild className="rounded-full bg-gradient-fire font-bold uppercase shadow-glow">
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
            className="h-80 w-full lg:h-full"
          />
        </div>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card/60 p-7">
          <h2 className="font-display text-3xl">OPENING HOURS</h2>
          <ul className="mt-4 space-y-1.5 text-sm">
            {BUSINESS.hours.map((h) => (
              <li key={h.day} className="flex justify-between border-b border-border/50 pb-1.5">
                <span>{h.day}</span>
                <span className="text-muted-foreground">{h.collection || "To be confirmed"}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Hours are set in admin settings and require confirmation from the restaurant.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card/60 p-7">
          <h2 className="font-display text-3xl">SOCIAL</h2>
          {hasSocial ? (
            <div className="mt-4 flex gap-3">
              {BUSINESS.social.instagram && (
                <a href={BUSINESS.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Instagram className="size-6 text-gold" />
                </a>
              )}
              {BUSINESS.social.facebook && (
                <a href={BUSINESS.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                  <Facebook className="size-6 text-gold" />
                </a>
              )}
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              Instagram, Facebook and TikTok links are configurable in admin settings. No accounts have been invented.
            </p>
          )}
        </div>
      </section>

      <p className="mt-8 rounded-2xl border border-border bg-card/60 p-5 text-sm text-muted-foreground">
        {ALLERGEN_NOTICE}
      </p>
    </div>
  );
}
