import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, CreditCard } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { BUSINESS, formatGBP } from "@/config/business";
import { lineTotal, useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Quayside Peri Peri Gloucester" },
      { name: "description", content: "Secure checkout for collection and delivery orders from Quayside Peri Peri, Gloucester." },
      { property: "og:title", content: "Checkout — Quayside Peri Peri" },
      { property: "og:description", content: "Complete your halal peri peri order for collection or delivery." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const STEPS = ["Your details", "Order type", "Address", "Timing", "Payment"] as const;

function Checkout() {
  const { lines, subtotal, onlineDiscount, total, orderType, setOrderType } = useCart();
  const [step, setStep] = useState(0);
  const [timing, setTiming] = useState<"asap" | "scheduled">("asap");
  const [marketing, setMarketing] = useState(false);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">YOUR BASKET IS EMPTY</h1>
        <Button asChild className="mt-6 rounded-full bg-gradient-fire font-bold uppercase">
          <Link to="/menu">Browse the menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.4fr_1fr] lg:px-8">
      <div>
        <h1 className="font-display text-5xl leading-none">CHECKOUT</h1>
        <ol className="mt-6 flex flex-wrap gap-2" aria-label="Checkout progress">
          {STEPS.map((s, i) => (
            <li
              key={s}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${
                i === step ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="size-3.5 text-gold" aria-hidden /> : <span>{i + 1}</span>}
              {s}
            </li>
          ))}
        </ol>

        <div className="mt-6 space-y-5 rounded-3xl border border-border bg-card/60 p-6">
          {step === 0 && (
            <>
              <h2 className="font-display text-3xl">YOUR DETAILS</h2>
              <p className="text-sm text-muted-foreground">No account needed — continue as a guest.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="first" label="First name" autoComplete="given-name" />
                <Field id="last" label="Last name" autoComplete="family-name" />
                <Field id="email" label="Email" type="email" autoComplete="email" />
                <Field id="phone" label="Phone" type="tel" autoComplete="tel" />
              </div>
              <Label className="flex items-start gap-3 text-sm">
                <Checkbox checked={marketing} onCheckedChange={(v) => setMarketing(Boolean(v))} className="mt-0.5" />
                <span className="text-muted-foreground">
                  I agree to receive marketing communications (optional). Order updates are sent regardless as an essential
                  service message.
                </span>
              </Label>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="font-display text-3xl">COLLECTION OR DELIVERY</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {(["collection", "delivery"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setOrderType(t)}
                    aria-pressed={orderType === t}
                    className={`rounded-2xl border p-5 text-left font-display text-2xl uppercase ${
                      orderType === t ? "border-primary bg-primary/10" : "border-border"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-display text-3xl">{orderType === "delivery" ? "DELIVERY ADDRESS" : "COLLECTION"}</h2>
              {orderType === "delivery" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="pc" label="Postcode" autoComplete="postal-code" />
                  <Field id="house2" label="House number / name" />
                  <Field id="street2" label="Street" autoComplete="address-line1" />
                  <Field id="city2" label="City" autoComplete="address-level2" />
                  <div className="sm:col-span-2">
                    <Label htmlFor="notes">Delivery instructions</Label>
                    <Textarea id="notes" className="mt-1.5" />
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Collect from {BUSINESS.address.line1}, {BUSINESS.address.city} {BUSINESS.address.postcode}.
                </p>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-display text-3xl">WHEN DO YOU WANT IT?</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {(["asap", "scheduled"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTiming(t)}
                    aria-pressed={timing === t}
                    className={`rounded-2xl border p-5 text-left font-display text-2xl uppercase ${
                      timing === t ? "border-primary bg-primary/10" : "border-border"
                    }`}
                  >
                    {t === "asap" ? "ASAP" : "Schedule"}
                  </button>
                ))}
              </div>
              {timing === "scheduled" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="date" label="Date" type="date" />
                  <Field id="time" label="Time" type="time" />
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Available slots depend on opening and last-order times, which require confirmation from the restaurant.
              </p>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="font-display text-3xl">PAYMENT</h2>
              <div className="flex items-start gap-4 rounded-2xl border border-gold/40 bg-gold/5 p-5">
                <CreditCard className="mt-0.5 size-6 shrink-0 text-gold" aria-hidden />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Card, Apple Pay and Google Pay via Stripe</p>
                  <p className="mt-1 text-muted-foreground">
                    Card payments run through Stripe-hosted checkout, so no card details ever touch this site. Taking real
                    payments needs the backend enabled plus <code>STRIPE_SECRET_KEY</code>,{" "}
                    <code>STRIPE_PUBLISHABLE_KEY</code> and <code>STRIPE_WEBHOOK_SECRET</code>. Say the word and I'll wire
                    it up next.
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && (
              <Button variant="outline" className="rounded-full" onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
            )}
            {step < STEPS.length - 1 && (
              <Button
                className="flex-1 rounded-full bg-gradient-fire font-bold uppercase shadow-glow"
                onClick={() => setStep((s) => s + 1)}
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>

      <aside className="h-fit rounded-3xl border border-border bg-card/60 p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-2xl">ORDER SUMMARY</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {lines.map((l) => (
            <li key={l.uid} className="flex justify-between gap-3">
              <span className="text-muted-foreground">
                {l.qty} × {l.name} <span className="text-xs">({l.size})</span>
              </span>
              <span>{formatGBP(lineTotal(l))}</span>
            </li>
          ))}
        </ul>
        <Separator className="my-4" />
        <div className="space-y-2 text-sm">
          <Row label="Subtotal" value={formatGBP(subtotal)} />
          <Row label={`Online discount (${BUSINESS.promotions.onlineDiscountPercent}%)`} value={`−${formatGBP(onlineDiscount)}`} />
          <Row label="Delivery fee" value={orderType === "delivery" ? "Set by zone" : "—"} />
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between font-display text-3xl">
          <span>TOTAL</span>
          <span className="text-gradient-gold">{formatGBP(total)}</span>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} className="mt-1.5" {...(autoComplete ? { autoComplete } : {})} />
    </div>
  );
}
