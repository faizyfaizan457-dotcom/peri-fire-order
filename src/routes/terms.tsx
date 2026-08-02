import { createFileRoute } from "@tanstack/react-router";

import { BUSINESS } from "@/config/business";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Quayside Peri Peri" },
      {
        name: "description",
        content:
          "Terms and conditions for ordering online from Quayside Peri Peri, Gloucester — orders, pricing, collection, delivery and liability.",
      },
      { property: "og:title", content: "Terms & Conditions — Quayside Peri Peri" },
      { property: "og:description", content: "The terms that apply to online orders for collection and delivery." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl leading-none">TERMS & CONDITIONS</h1>
      <p className="mt-4 rounded-2xl border border-gold/40 bg-gold/5 p-5 text-sm">
        Template terms reflecting how the platform works. They must be reviewed and approved by {BUSINESS.name} before
        launch.
      </p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          <strong className="text-foreground">Orders.</strong> An order is an offer to purchase. It is accepted when the
          restaurant marks it as accepted. Items can be unavailable at short notice; if something can't be prepared we will
          contact you using the details supplied.
        </p>
        <p>
          <strong className="text-foreground">Prices.</strong> Prices are shown in GBP and include VAT where applicable.
          The pricing model supports VAT-inclusive display; the business is responsible for configuring the correct tax
          settings.
        </p>
        <p>
          <strong className="text-foreground">Collection and delivery.</strong> Delivery is available to configured zones
          only. Fees, minimum order values and estimated times are set by the restaurant and shown at checkout before you
          pay.
        </p>
        <p>
          <strong className="text-foreground">Allergens.</strong> Our kitchen handles multiple allergens. Please speak to
          staff before ordering if you have an allergy or intolerance.
        </p>
        <p>
          <strong className="text-foreground">Payments.</strong> Payments are processed by Stripe. Failed or disputed
          payments may result in an order being cancelled.
        </p>
        <p>
          <strong className="text-foreground">Contact.</strong> {BUSINESS.address.line1}, {BUSINESS.address.city}{" "}
          {BUSINESS.address.postcode} · {BUSINESS.phone}.
        </p>
      </div>
    </div>
  );
}
