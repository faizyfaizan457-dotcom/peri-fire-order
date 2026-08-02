import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { BUSINESS } from "@/config/business";

export type OrderType = "collection" | "delivery";

export interface CartLineOption {
  groupId: string;
  optionId: string;
  name: string;
  price: number;
}

export interface CartLine {
  uid: string;
  productId: string;
  name: string;
  image?: string;
  size: string;
  basePrice: number;
  options: CartLineOption[];
  meal: boolean;
  mealPrice: number;
  notes?: string;
  qty: number;
}

export function lineUnitPrice(line: CartLine) {
  const extras = line.options.reduce((sum, o) => sum + o.price, 0);
  return line.basePrice + extras + (line.meal ? line.mealPrice : 0);
}

export function lineTotal(line: CartLine) {
  return lineUnitPrice(line) * line.qty;
}

interface CartState {
  lines: CartLine[];
  orderType: OrderType;
  cartOpen: boolean;
}

interface CartContextValue extends CartState {
  setCartOpen: (open: boolean) => void;
  setOrderType: (type: OrderType) => void;
  addLine: (line: Omit<CartLine, "uid">) => void;
  updateQty: (uid: string, qty: number) => void;
  removeLine: (uid: string) => void;
  updateNotes: (uid: string, notes: string) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
  onlineDiscount: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "qpp-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [orderType, setOrderType] = useState<OrderType>("collection");
  const [cartOpen, setCartOpen] = useState(false);

  // Hydrate after mount so SSR markup matches.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { lines?: CartLine[]; orderType?: OrderType };
      if (parsed.lines) setLines(parsed.lines);
      if (parsed.orderType) setOrderType(parsed.orderType);
    } catch {
      /* ignore corrupt cart */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines, orderType }));
    } catch {
      /* storage unavailable */
    }
  }, [lines, orderType]);

  const addLine = useCallback((line: Omit<CartLine, "uid">) => {
    setLines((prev) => [...prev, { ...line, uid: crypto.randomUUID() }]);
  }, []);

  const updateQty = useCallback((uid: string, qty: number) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.uid !== uid) : prev.map((l) => (l.uid === uid ? { ...l, qty } : l)),
    );
  }, []);

  const removeLine = useCallback((uid: string) => {
    setLines((prev) => prev.filter((l) => l.uid !== uid));
  }, []);

  const updateNotes = useCallback((uid: string, notes: string) => {
    setLines((prev) => prev.map((l) => (l.uid === uid ? { ...l, notes } : l)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + lineTotal(l), 0), [lines]);
  const onlineDiscount = useMemo(
    () => Math.round(subtotal * (BUSINESS.promotions.onlineDiscountPercent / 100) * 100) / 100,
    [subtotal],
  );
  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);

  const value: CartContextValue = {
    lines,
    orderType,
    cartOpen,
    setCartOpen,
    setOrderType,
    addLine,
    updateQty,
    removeLine,
    updateNotes,
    clear,
    itemCount,
    subtotal,
    onlineDiscount,
    total: Math.max(0, subtotal - onlineDiscount),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
