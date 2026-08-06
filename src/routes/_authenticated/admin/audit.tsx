import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { listAuditLogs } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/audit")({
  head: () => ({
    meta: [
      { title: "Audit Log | Quayside Peri Peri Admin" },
      {
        name: "description",
        content: "Immutable audit trail of admin actions and role changes at Quayside Peri Peri.",
      },
      { property: "og:title", content: "Audit Log — Quayside Peri Peri Admin" },
      { property: "og:description", content: "Immutable record of every admin action." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuditPage,
});

function AuditPage() {
  const fetchLogs = useServerFn(listAuditLogs);
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "audit"],
    queryFn: () => fetchLogs({ data: { limit: 100 } }),
  });

  return (
    <div className="rounded-3xl border border-border bg-card/60 p-6">
      <h2 className="font-display text-2xl leading-none">Audit log</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Read-only record of every tracked change. Entries cannot be edited or deleted by anyone,
        including admins.
      </p>

      {isLoading ? (
        <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
      ) : !data?.length ? (
        <p className="mt-4 text-sm text-muted-foreground">No audit entries yet.</p>
      ) : (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="pb-2 pr-4 font-semibold">When</th>
                <th className="pb-2 pr-4 font-semibold">Action</th>
                <th className="pb-2 pr-4 font-semibold">Table</th>
                <th className="pb-2 pr-4 font-semibold">Record</th>
                <th className="pb-2 font-semibold">By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((row) => (
                <tr key={row.id}>
                  <td className="py-2.5 pr-4 whitespace-nowrap text-muted-foreground">
                    {new Date(row.created_at).toLocaleString("en-GB")}
                  </td>
                  <td className="py-2.5 pr-4 font-semibold text-foreground">{row.action}</td>
                  <td className="py-2.5 pr-4 text-muted-foreground">{row.table_name}</td>
                  <td className="py-2.5 pr-4 font-mono text-xs text-muted-foreground">
                    {row.record_id.slice(0, 8)}…
                  </td>
                  <td className="py-2.5 text-muted-foreground">{row.actorEmail ?? "system"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
