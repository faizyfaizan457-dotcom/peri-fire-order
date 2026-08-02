import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatGBP } from "@/config/business";
import type { Product } from "@/data/menu";

export function ProductCard({ product, onSelect }: { product: Product; onSelect: (p: Product) => void }) {
  const from = Math.min(...product.sizes.map((s) => s.price));
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/70 transition-transform duration-300 hover:-translate-y-1 hover:border-primary/60">
      {product.image && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={768}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.tags?.[0] && (
            <span className="absolute left-3 top-3 rounded-full bg-gradient-fire px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
              {product.tags[0]}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-xl leading-none">{product.name}</h3>
        {product.description && <p className="text-sm text-muted-foreground">{product.description}</p>}
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-semibold text-gold">
            {product.sizes.length > 1 ? `from ${formatGBP(from)}` : formatGBP(from)}
          </span>
          <Button
            size="sm"
            className="rounded-full bg-gradient-fire font-bold uppercase"
            onClick={() => onSelect(product)}
            aria-label={`Add ${product.name}`}
          >
            <Plus className="size-4" /> Add
          </Button>
        </div>
      </div>
    </article>
  );
}
