import { createFileRoute } from "@tanstack/react-router";

import { ALLERGEN_NOTICE, BUSINESS } from "@/config/business";
import { ALLERGENS } from "@/data/menu";

export const Route = createFileRoute("/allergens")({
  head: () => ({
    meta: [
      { title: "Allergen Information | Quayside Peri Peri Gloucester" },
      {
        name: "description",
        content:
          "Allergen information for Quayside Peri Peri, Gloucester. Please speak to our staff before ordering if you have a food allergy or intolerance.",
      },
      { property: "og:title", content: "Allergen Information — Quayside Peri Peri" },
      { property: "og:description", content: "Allergen guidance and how to ask our team about specific dishes." },
    ],
  }),
  component: Allergens,
});

function Allergens() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl leading-none">ALLERGEN INFORMATION</h1>
      <p className="mt-6 rounded-2xl border border-heat/40 bg-heat/10 p-5 font-semibold">{ALLERGEN_NOTICE}</p>
      <p className="mt-6 text-muted-foreground">
        The 14 allergens below must be declared under UK food law. Per-dish allergen data is configured by the restaurant
        against each product in the admin dashboard — we do not publish allergen claims for individual dishes until the
        business has entered and verified them.
      </p>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {ALLERGENS.map((a) => (
          <li key={a} className="rounded-xl border border-border bg-card/60 px-4 py-3 text-sm">
            {a}
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-muted-foreground">
        For anything urgent, call us on{" "}
        <a className="text-gold" href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}>
          {BUSINESS.phone}
        </a>
        .
      </p>
    </div>
  );
}
