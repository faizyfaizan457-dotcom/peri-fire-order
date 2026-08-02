import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X, Flame } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BUSINESS, formatGBP } from "@/config/business";
import { searchProducts } from "@/data/menu";
import { useCart } from "@/lib/cart";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/order", label: "Order Online" },
  { to: "/deals", label: "Deals" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { itemCount, total, setCartOpen } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const results = searchProducts(query);

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass-panel border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-18 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-2" aria-label={`${BUSINESS.name} home`}>
            <span className="grid size-9 place-items-center rounded-full bg-gradient-fire shadow-glow">
              <Flame className="size-5 text-primary-foreground" aria-hidden />
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg tracking-wide text-foreground sm:text-xl">
                QUAYSIDE <span className="text-gradient-gold">PERI PERI</span>
              </span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:block">
                Fire Grilled • Halal • Fresh
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="ml-6 hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-full px-3 py-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <Button variant="ghost" size="icon" aria-label="Search menu" onClick={() => setSearchOpen(true)}>
              <Search className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Your account" asChild>
              <Link to="/account">
                <User className="size-5" />
              </Link>
            </Button>
            <Button
              variant="secondary"
              className="relative gap-2 rounded-full font-semibold"
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart, ${itemCount} items, ${formatGBP(total)}`}
            >
              <ShoppingBag className="size-4" />
              <span className="hidden sm:inline">{formatGBP(total)}</span>
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-gold text-[11px] font-bold text-gold-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
            <Button asChild className="hidden rounded-full bg-gradient-fire font-bold uppercase shadow-glow lg:inline-flex">
              <Link to="/order">Order</Link>
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[86vw] max-w-sm border-l bg-background p-0">
                <div className="flex items-center justify-between border-b px-5 py-4">
                  <span className="font-display text-xl">MENU</span>
                  <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                    <X className="size-5" />
                  </Button>
                </div>
                <nav className="flex flex-col p-3" aria-label="Mobile">
                  {NAV.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl px-4 py-3.5 font-display text-2xl tracking-wide text-foreground transition-colors hover:bg-secondary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-2 space-y-3 px-5">
                  <Button asChild className="w-full rounded-full bg-gradient-fire py-6 font-bold uppercase shadow-glow">
                    <Link to="/order" onClick={() => setMobileOpen(false)}>
                      Order Online
                    </Link>
                  </Button>
                  <a
                    href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}
                    className="block rounded-full border border-border py-3 text-center font-semibold"
                  >
                    Call {BUSINESS.phone}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">SEARCH THE MENU</DialogTitle>
          </DialogHeader>
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="chicken, burger, fries, shake, lamb…"
            aria-label="Search the menu"
          />
          <ul className="max-h-72 space-y-1 overflow-y-auto">
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  to="/menu"
                  hash={p.categoryId}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-secondary"
                >
                  <span className="font-semibold">{p.name}</span>
                  <span className="text-gold">{formatGBP(p.sizes[0]!.price)}</span>
                </Link>
              </li>
            ))}
            {query && results.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-muted-foreground">No matches — try “chicken” or “fries”.</li>
            )}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
