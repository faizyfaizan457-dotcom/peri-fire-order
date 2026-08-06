import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ClipboardList, Receipt, ShieldCheck, Users } from "lucide-react";

import { getAdminStats } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Overview | Quayside Peri Peri" },
      { name: "description", content: "Role-protected admin overview for Quayside Peri Peri." },
      { property: "og:title", content: "Admin Overview — Quayside Peri Peri" },
      { property: "og:description", content: "Staff and admin dashboard overview." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminOverview,
});

function AdminOverview() {
  const fetchStats = useServerFn(getAdminStats);
  const { data, isLoading } = useQuery({ queryKey: ["admin", "stats"], queryFn: () => fetchStats() });

  const cards = [
    { icon: Users, label: "Customer accounts", value: data?.customers },
    { icon: ShieldCheck, label: "Role assignments", value: data?.staff },
    { icon: Receipt, label: "Orders", value: data?.orders },
    { icon: ClipboardList, label: "Audit entries", value: data?.auditEntries },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-3xl border border-border bg-card/60 p-6">
          <card.icon className="size-5 text-gold" aria-hidden />
          <p className="mt-3 font-display text-4xl leading-none">
            {isLoading ? "—" : (card.value ?? 0)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
