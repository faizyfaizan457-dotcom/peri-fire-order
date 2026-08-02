import { createFileRoute } from "@tanstack/react-router";

import { BUSINESS, IMAGES } from "@/config/business";
import { IMAGES as MENU_IMAGES } from "@/data/menu";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Halal Peri Peri Restaurant in Gloucester" },
      {
        name: "description",
        content:
          "Quayside Peri Peri is a halal peri peri grill on Southgate Street, Gloucester, serving fire grilled chicken, gourmet burgers, wings and loaded fries.",
      },
      { property: "og:title", content: "About Quayside Peri Peri, Gloucester" },
      { property: "og:description", content: "Halal, fire grilled and fresh — cooked to order on Southgate Street." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{BUSINESS.tagline}</p>
      <h1 className="mt-2 font-display text-5xl leading-none sm:text-6xl">ABOUT QUAYSIDE PERI PERI</h1>
      <img
        src={MENU_IMAGES.chicken}
        alt="Fire grilled peri peri chicken"
        loading="lazy"
        width={1536}
        height={1152}
        className="mt-8 aspect-[16/9] w-full rounded-3xl object-cover"
      />
      <div className="mt-8 space-y-5 text-muted-foreground">
        <p>
          We're a halal peri peri grill in the heart of Gloucester. Everything is marinated, basted and fire grilled to
          order — from quarter chickens and wings to gourmet beef burgers, handmade lamb patties, loaded fries and thick
          shakes.
        </p>
        <p>
          Choose your heat: Lemon &amp; Herbs, Mild, Hot or X-Hot. Add toppings, sauces and meal upgrades exactly how you
          like them, then collect from {BUSINESS.address.line1} or have it delivered.
        </p>
        <p className="text-sm">
          Our story, team details, certifications and opening hours are managed in admin settings and require confirmation
          from the business before publication — nothing here has been invented.
        </p>
      </div>
      <span className="hidden">{Object.keys(IMAGES ?? {}).length}</span>
    </div>
  );
}
