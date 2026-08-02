import { Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { formatGBP } from "@/config/business";
import { MODIFIER_GROUPS, type Product } from "@/data/menu";
import { useCart, type CartLineOption } from "@/lib/cart";

export function ProductDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { addLine, setCartOpen } = useCart();
  const [sizeLabel, setSizeLabel] = useState("");
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [meal, setMeal] = useState(false);
  const [notes, setNotes] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!product) return;
    setSizeLabel(product.sizes[0]!.label);
    setSelected(
      Object.fromEntries(
        (product.modifiers ?? []).map((gid) => {
          const group = MODIFIER_GROUPS[gid]!;
          return [gid, group.type === "single" && group.required ? [group.options[0]!.id] : []];
        }),
      ),
    );
    setMeal(false);
    setNotes("");
    setQty(1);
  }, [product]);

  const size = product?.sizes.find((s) => s.label === sizeLabel) ?? product?.sizes[0];

  const options: CartLineOption[] = useMemo(() => {
    if (!product) return [];
    return (product.modifiers ?? []).flatMap((gid) => {
      const group = MODIFIER_GROUPS[gid]!;
      return (selected[gid] ?? []).map((oid) => {
        const opt = group.options.find((o) => o.id === oid)!;
        return { groupId: gid, optionId: oid, name: opt.name, price: opt.price };
      });
    });
  }, [product, selected]);

  if (!product || !size) return null;

  const extras = options.reduce((sum, o) => sum + o.price, 0);
  const mealPrice = product.mealUpgrade ?? 0;
  const unit = size.price + extras + (meal ? mealPrice : 0);

  const toggle = (groupId: string, optionId: string, single: boolean) => {
    setSelected((prev) => {
      const current = prev[groupId] ?? [];
      if (single) return { ...prev, [groupId]: [optionId] };
      return {
        ...prev,
        [groupId]: current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId],
      };
    });
  };

  const add = () => {
    addLine({
      productId: product.id,
      name: product.name,
      ...(product.image ? { image: product.image } : {}),
      size: size.label,
      basePrice: size.price,
      options,
      meal,
      mealPrice,
      ...(notes.trim() ? { notes: notes.trim() } : {}),
      qty,
    });
    onOpenChange(false);
    toast.success(`${qty} × ${product.name} added`, { description: "Added to your order" });
    setCartOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-lg overflow-y-auto p-0">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-44 w-full object-cover"
          />
        )}
        <div className="space-y-6 p-6">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="font-display text-3xl leading-none">{product.name}</DialogTitle>
            <DialogDescription>{product.description ?? "Freshly prepared to order."}</DialogDescription>
          </DialogHeader>

          {product.sizes.length > 1 && (
            <section>
              <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-gold">Size</h3>
              <RadioGroup value={sizeLabel} onValueChange={setSizeLabel} className="grid gap-2">
                {product.sizes.map((s) => (
                  <Label
                    key={s.label}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-card/60 px-4 py-3 has-[button[data-state=checked]]:border-primary"
                  >
                    <span className="flex items-center gap-3">
                      <RadioGroupItem value={s.label} />
                      {s.label}
                    </span>
                    <span className="font-semibold text-gold">{formatGBP(s.price)}</span>
                  </Label>
                ))}
              </RadioGroup>
            </section>
          )}

          {(product.modifiers ?? []).map((gid) => {
            const group = MODIFIER_GROUPS[gid]!;
            const single = group.type === "single";
            return (
              <section key={gid}>
                <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-gold">
                  {group.name}
                  {group.required && <span className="ml-2 text-xs text-muted-foreground">required</span>}
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {group.options.map((o) => {
                    const checked = (selected[gid] ?? []).includes(o.id);
                    return (
                      <Label
                        key={o.id}
                        className={`flex cursor-pointer items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                          checked ? "border-primary bg-primary/10" : "border-border bg-card/60"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          {single ? (
                            <input
                              type="radio"
                              name={gid}
                              checked={checked}
                              onChange={() => toggle(gid, o.id, true)}
                              className="size-4 accent-[var(--primary)]"
                            />
                          ) : (
                            <Checkbox checked={checked} onCheckedChange={() => toggle(gid, o.id, false)} />
                          )}
                          {o.name}
                        </span>
                        {o.price > 0 && <span className="text-xs font-semibold text-gold">+{formatGBP(o.price)}</span>}
                      </Label>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {mealPrice > 0 && (
            <section className="rounded-2xl border border-gold/40 bg-gold/5 p-4">
              <Label className="flex cursor-pointer items-start gap-3">
                <Checkbox checked={meal} onCheckedChange={(v) => setMeal(Boolean(v))} className="mt-0.5" />
                <span>
                  <span className="block font-display text-xl">MAKE IT A MEAL?</span>
                  <span className="text-sm text-muted-foreground">Add fries + a drink for {formatGBP(mealPrice)}</span>
                </span>
              </Label>
            </section>
          )}

          <section>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-gold">Special instructions</h3>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value.slice(0, 200))}
              placeholder="e.g. No onions please."
              aria-label="Special instructions"
            />
          </section>

          <Separator />

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Base {formatGBP(size.price)}</span>
            {extras > 0 && <span>Extras +{formatGBP(extras)}</span>}
            {meal && <span>Meal +{formatGBP(mealPrice)}</span>}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-border p-1">
              <Button variant="ghost" size="icon" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="size-4" />
              </Button>
              <span className="w-8 text-center font-bold">{qty}</span>
              <Button variant="ghost" size="icon" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(20, q + 1))}>
                <Plus className="size-4" />
              </Button>
            </div>
            <Button onClick={add} className="h-12 flex-1 rounded-full bg-gradient-fire font-bold uppercase shadow-glow">
              Add to order · {formatGBP(unit * qty)}
            </Button>
          </div>
          {product.tags?.includes("halal") && <Badge variant="secondary">Halal</Badge>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
