import { createFileRoute, Link } from "@tanstack/react-router";
import { Store, Truck, QrCode } from "lucide-react";
import { useState } from "react";

import { ProductCard } from "@/components/site/ProductCard";
import { ProductDialog } from "@/components/site/ProductDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BUSINESS } from "@/config/business";
import { BESTSELLERS, type Product } from "@/data/menu";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order Online | Collection & Delivery — Quayside Peri Peri Gloucester" },
      {
        name: "description",
        content:
          "Order halal peri peri chicken, burgers and loaded fries online for collection or delivery in Gloucester. 10% off every online order.",
      },
      { property: "og:title", content: "Order Online — Quayside Peri Peri" },
      { property: "og:description", content: "Collection or delivery across Gloucester. 10% off online orders." },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { orderType, setOrderType } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [postcode, setPostcode] = useState("");
  const [zoneResult, setZoneResult] = useState<string | null>(null);

  const checkPostcode = () => {
    const clean = postcode.replace(/\s/g, "").toUpperCase();
    const zone = BUSINESS.delivery.zones.find((z) => z.active && z.postcodePrefixes.some((p) => clean.startsWith(p)));
    if (!clean) setZoneResult("Enter a postcode to check delivery.");
    else if (!zone) setZoneResult("Sorry — we can't confirm delivery to this postcode. Collection is available.");
    else
      setZoneResult(
        `${zone.name} — delivery available. Fee and minimum order are set by the restaurant in admin settings and will show at checkout.`,
      );
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <h1 className="font-display text-5xl leading-none sm:text-6xl">START YOUR ORDER</h1>
      <p className="mt-3 text-muted-foreground">Choose how you'd like your food, then build your basket.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {(
          [
            { id: "collection", label: "COLLECTION", text: "Pick up from 79 Southgate Street", icon: Store },
            { id: "delivery", label: "DELIVERY", text: "Delivered to your door", icon: Truck },
          ] as const
        ).map((o) => (
          <button
            key={o.id}
            onClick={() => setOrderType(o.id)}
            aria-pressed={orderType === o.id}
            className={`rounded-3xl border p-6 text-left transition-colors ${
              orderType === o.id ? "border-primary bg-primary/10 shadow-glow" : "border-border bg-card/60"
            }`}
          >
            <o.icon className="size-6 text-gold" aria-hidden />
            <span className="mt-3 block font-display text-3xl leading-none">{o.label}</span>
            <span className="text-sm text-muted-foreground">{o.text}</span>
          </button>
        ))}
      </div>

      {orderType === "delivery" && (
        <section className="mt-8 space-y-4 rounded-3xl border border-border bg-card/60 p-6">
          <h2 className="font-display text-3xl">DELIVERY DETAILS</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="postcode">Postcode</Label>
              <div className="mt-1.5 flex gap-2">
                <Input id="postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="GL1 1UB" />
                <Button onClick={checkPostcode} className="rounded-full bg-gradient-fire font-bold uppercase">
                  Check
                </Button>
              </div>
              {zoneResult && <p className="mt-2 text-sm text-gold">{zoneResult}</p>}
            </div>
            <Field id="house" label="House number / name" />
            <Field id="street" label="Street" />
            <Field id="city" label="City" defaultValue="Gloucester" />
            <div>
              <Label htmlFor="instructions">Delivery instructions</Label>
              <Textarea id="instructions" className="mt-1.5" placeholder="e.g. Ring the buzzer for flat 3" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Delivery zones, fees, minimum order values and estimated times are configurable per zone and require
            confirmation from the restaurant.
          </p>
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-display text-4xl">POPULAR RIGHT NOW</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BESTSELLERS.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={setProduct} />
          ))}
        </div>
        <Button asChild variant="outline" className="mt-6 rounded-full border-gold/50 text-gold">
          <Link to="/menu">Browse the full menu</Link>
        </Button>
      </section>

      <section className="mt-12 flex items-start gap-4 rounded-3xl border border-border bg-card/60 p-6">
        <QrCode className="size-8 shrink-0 text-gold" aria-hidden />
        <p className="text-sm text-muted-foreground">
          <span className="block font-semibold text-foreground">QR ordering ready</span>
          This page is the QR destination for in-store ordering. Table numbers and counter locations can be passed as a
          parameter once the restaurant confirms the layout.
        </p>
      </section>

      <ProductDialog product={product} open={Boolean(product)} onOpenChange={(o) => !o && setProduct(null)} />
    </div>
  );
}

function Field({ id, label, defaultValue }: { id: string; label: string; defaultValue?: string }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} className="mt-1.5" {...(defaultValue ? { defaultValue } : {})} />
    </div>
  );
}
