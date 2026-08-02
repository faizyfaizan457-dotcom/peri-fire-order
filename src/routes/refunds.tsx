import { createFileRoute } from "@tanstack/react-router";

import { BUSINESS } from "@/config/business";

export const Route = createFileRoute("/refunds")({
  head: () => ({
    meta: [
      { title: "Refund & Cancellation Policy | Quayside Peri Peri" },
      {
        name: "description",
        content:
          "How to cancel an order or request a refund from Quayside Peri Peri, Gloucester, including missing items, incorrect orders and payment issues.",
      },
      { property: "og:title", content: "Refund & Cancellation Policy — Quayside Peri Peri" },
      { property: "og:description", content: "Cancellations, refunds and how to report a problem with an order." },
    ],
  }),
  component: Refunds,
});

function Refunds() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl leading-none">REFUND & CANCELLATION POLICY</h1>
      <p className="mt-4 rounded-2xl border border-gold/40 bg-gold/5 p-5 text-sm">
        Template policy — refund windows and goodwill rules must be set by {BUSINESS.name} before launch.
      </p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          <strong className="text-foreground">Cancelling.</strong> Food is cooked to order, so orders can normally only be
          cancelled before the kitchen accepts them. Call{" "}
          <a className="text-gold" href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}>
            {BUSINESS.phone}
          </a>{" "}
          as soon as possible.
        </p>
        <p>
          <strong className="text-foreground">Something wrong with your order?</strong> Contact us the same day with your
          order number. Missing or incorrect items are resolved by replacement or refund.
        </p>
        <p>
          <strong className="text-foreground">Refunds.</strong> Approved refunds are issued through Stripe to the original
          payment method. Processing time depends on your bank.
        </p>
        <p>
          <strong className="text-foreground">Loyalty points.</strong> Points earned on a refunded order are reversed.
        </p>
      </div>
    </div>
  );
}
