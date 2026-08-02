import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { BUSINESS, formatGBP } from "@/config/business";
import { lineTotal, useCart } from "@/lib/cart";

export function CartSheet() {
  const { cartOpen, setCartOpen, lines, updateQty, removeLine, updateNotes, subtotal, onlineDiscount, total, orderType } =
    useCart();

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex w-full max-w-md flex-col bg-background p-0">
        <SheetHeader className="border-b px-5 py-4 text-left">
          <SheetTitle className="font-display text-2xl">YOUR ORDER</SheetTitle>
          <p className="text-xs uppercase tracking-widest text-gold">{orderType}</p>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" aria-hidden />
            <p className="text-muted-foreground">Your basket is empty. Fire up the grill.</p>
            <Button asChild className="rounded-full bg-gradient-fire font-bold uppercase">
              <Link to="/menu" onClick={() => setCartOpen(false)}>
                Browse menu
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {lines.map((line) => (
                <li key={line.uid} className="rounded-2xl border border-border bg-card/60 p-3">
                  <div className="flex gap-3">
                    {line.image && (
                      <img src={line.image} alt="" loading="lazy" width={64} height={64} className="size-16 rounded-xl object-cover" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold leading-tight">{line.name}</p>
                        <span className="whitespace-nowrap font-semibold text-gold">{formatGBP(lineTotal(line))}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {line.size}
                        {line.meal ? " · Meal upgrade" : ""}
                        {line.options.length ? ` · ${line.options.map((o) => o.name).join(", ")}` : ""}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center gap-1 rounded-full border border-border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            aria-label={`Decrease ${line.name}`}
                            onClick={() => updateQty(line.uid, line.qty - 1)}
                          >
                            <Minus className="size-3.5" />
                          </Button>
                          <span className="w-6 text-center text-sm font-bold">{line.qty}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            aria-label={`Increase ${line.name}`}
                            onClick={() => updateQty(line.uid, line.qty + 1)}
                          >
                            <Plus className="size-3.5" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground"
                          aria-label={`Remove ${line.name}`}
                          onClick={() => removeLine(line.uid)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                      <Input
                        value={line.notes ?? ""}
                        onChange={(e) => updateNotes(line.uid, e.target.value.slice(0, 160))}
                        placeholder="Add a note, e.g. no onions"
                        aria-label={`Note for ${line.name}`}
                        className="mt-2 h-9 text-xs"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t px-5 py-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatGBP(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Online order discount ({BUSINESS.promotions.onlineDiscountPercent}%)</span>
                <span className="text-gold">−{formatGBP(onlineDiscount)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Delivery fee</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between font-display text-2xl">
                <span>TOTAL</span>
                <span className="text-gradient-gold">{formatGBP(total)}</span>
              </div>
              <div className="grid gap-2">
                <Button asChild className="h-12 rounded-full bg-gradient-fire font-bold uppercase shadow-glow">
                  <Link to="/checkout" onClick={() => setCartOpen(false)}>
                    Checkout
                  </Link>
                </Button>
                <Button variant="ghost" onClick={() => setCartOpen(false)}>
                  Continue shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function MobileOrderBar() {
  const { itemCount, total, setCartOpen } = useCart();
  if (itemCount === 0) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t glass-panel px-4 py-3 lg:hidden">
      <Button
        onClick={() => setCartOpen(true)}
        className="h-12 w-full justify-between rounded-full bg-gradient-fire px-5 font-bold uppercase shadow-glow"
      >
        <span>View order ({itemCount})</span>
        <span>{formatGBP(total)}</span>
      </Button>
    </div>
  );
}
