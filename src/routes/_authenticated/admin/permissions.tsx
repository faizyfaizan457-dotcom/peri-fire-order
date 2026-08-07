import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2, RotateCcw, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  listRolePermissions,
  resetRolePermissions,
  setRolePermission,
} from "@/lib/admin.functions";
import { listFeatureAreas } from "@/lib/features.functions";
import type { FeatureKey } from "@/lib/feature-areas";
import { useAdminProfile } from "./route";

export const Route = createFileRoute("/_authenticated/admin/permissions")({
  head: () => ({
    meta: [
      { title: "Permissions Matrix | Quayside Peri Peri Admin" },
      {
        name: "description",
        content:
          "Grant or revoke view and manage access per feature area for Super Admin and Staff roles.",
      },
      { property: "og:title", content: "Permissions Matrix — Quayside Peri Peri Admin" },
      { property: "og:description", content: "Per-feature access control for admin and staff roles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PermissionsPage,
});

type Cell = { canView: boolean; canManage: boolean };
type Matrix = Record<"admin" | "staff", Record<string, Cell>>;

const ROLES = [
  { key: "admin" as const, label: "Super Admin" },
  { key: "staff" as const, label: "Staff" },
];

function PermissionsPage() {
  const queryClient = useQueryClient();
  const { data: me } = useAdminProfile();
  const isAdmin = me?.isAdmin === true;

  const fetchPerms = useServerFn(listRolePermissions);
  const savePerm = useServerFn(setRolePermission);
  const resetPerms = useServerFn(resetRolePermissions);
  const fetchAreas = useServerFn(listFeatureAreas);

  const permsQuery = useQuery({
    queryKey: ["admin", "permissions"],
    queryFn: () => fetchPerms(),
  });

  const areasQuery = useQuery({
    queryKey: ["admin", "feature-areas"],
    queryFn: () => fetchAreas(),
  });

  const featureAreas = (areasQuery.data ?? []).filter((a) => a.active);

  const matrix: Matrix = { admin: {}, staff: {} };
  for (const row of permsQuery.data ?? []) {
    matrix[row.role][row.feature] = { canView: row.canView, canManage: row.canManage };
  }

  const saveMutation = useMutation({
    mutationFn: (vars: { role: "admin" | "staff"; feature: FeatureKey; canView: boolean; canManage: boolean }) =>
      savePerm({ data: vars }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin", "permissions"] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "audit"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not save permission"),
  });

  const resetMutation = useMutation({
    mutationFn: () => resetPerms(),
    onSuccess: () => {
      toast.success("Permissions restored to defaults");
      void queryClient.invalidateQueries({ queryKey: ["admin", "permissions"] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "audit"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not reset permissions"),
  });

  const cellFor = (role: "admin" | "staff", feature: string): Cell =>
    matrix[role][feature] ?? { canView: false, canManage: false };

  const toggle = (
    role: "admin" | "staff",
    feature: FeatureKey,
    field: "canView" | "canManage",
    value: boolean,
  ) => {
    const current = cellFor(role, feature);
    const next = { ...current, [field]: value };
    if (field === "canManage" && value) next.canView = true;
    if (field === "canView" && !value) next.canManage = false;
    saveMutation.mutate({ role, feature, canView: next.canView, canManage: next.canManage });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl leading-none">PERMISSIONS MATRIX</h2>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
            Choose exactly what each role can reach. <strong className="text-foreground">View</strong>{" "}
            opens the area read-only; <strong className="text-foreground">Manage</strong> allows changes
            and always includes view. Every toggle is written to the audit log.
          </p>
        </div>
        {isAdmin && (
          <Button
            variant="outline"
            onClick={() => resetMutation.mutate()}
            disabled={resetMutation.isPending}
            className="rounded-full"
          >
            {resetMutation.isPending ? (
              <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
            ) : (
              <RotateCcw className="mr-2 size-4" aria-hidden />
            )}
            Restore defaults
          </Button>
        )}
      </div>

      {!isAdmin && (
        <p className="rounded-3xl border border-border bg-card/60 p-6 text-sm text-muted-foreground">
          You have staff access, so this matrix is read-only. Only a Super Admin can change who can
          reach each area.
        </p>
      )}

      {permsQuery.isLoading ? (
        <div className="flex items-center gap-2 rounded-3xl border border-border bg-card/60 p-6 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" aria-hidden /> Loading permissions…
        </div>
      ) : permsQuery.error ? (
        <p className="rounded-3xl border border-destructive/40 bg-card/60 p-6 text-sm text-destructive">
          {permsQuery.error instanceof Error ? permsQuery.error.message : "Could not load permissions."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-border bg-card/60">
          <table className="w-full min-w-[680px] border-collapse text-sm">
            <caption className="sr-only">Feature access by role</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Feature area
                </th>
                {ROLES.map((r) => (
                  <th
                    key={r.key}
                    scope="col"
                    colSpan={2}
                    className="border-l border-border px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-gold"
                  >
                    {r.label}
                  </th>
                ))}
              </tr>
              <tr className="border-b border-border">
                <th scope="col" className="px-5 py-2" />
                {ROLES.map((r) => (
                  <Fragment key={r.key}>
                    <th
                      scope="col"
                      className="border-l border-border px-4 py-2 text-center text-xs font-semibold text-muted-foreground"
                    >
                      View
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 text-center text-xs font-semibold text-muted-foreground"
                    >
                      Manage
                    </th>
                  </Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureAreas.map((feature) => (
                <tr key={feature.key} className="border-b border-border/60 last:border-0">
                  <th scope="row" className="px-5 py-4 text-left align-middle">
                    <span className="block font-semibold text-foreground">{feature.label}</span>
                    <span className="block text-xs text-muted-foreground">{feature.hint}</span>
                  </th>
                  {ROLES.map((r) => {
                    const cell = cellFor(r.key, feature.key);
                    return (
                      <Fragment key={r.key}>
                        <td className="border-l border-border px-4 py-4 text-center">
                          <PermToggle
                            checked={cell.canView}
                            disabled={!isAdmin || saveMutation.isPending}
                            label={`${r.label} can view ${feature.label}`}
                            onChange={(v) => toggle(r.key, feature.key, "canView", v)}
                            readOnly={!isAdmin}
                          />
                        </td>
                        <td className="px-4 py-4 text-center">
                          <PermToggle
                            checked={cell.canManage}
                            disabled={!isAdmin || saveMutation.isPending}
                            label={`${r.label} can manage ${feature.label}`}
                            onChange={(v) => toggle(r.key, feature.key, "canManage", v)}
                            readOnly={!isAdmin}
                          />
                        </td>
                      </Fragment>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function PermToggle({
  checked,
  disabled,
  label,
  onChange,
  readOnly,
}: {
  checked: boolean;
  disabled: boolean;
  label: string;
  onChange: (value: boolean) => void;
  readOnly: boolean;
}) {
  if (readOnly) {
    return checked ? (
      <Check className="mx-auto size-4 text-gold" aria-label={`${label}: yes`} />
    ) : (
      <X className="mx-auto size-4 text-muted-foreground" aria-label={`${label}: no`} />
    );
  }
  return (
    <Switch checked={checked} disabled={disabled} onCheckedChange={onChange} aria-label={label} />
  );
}
