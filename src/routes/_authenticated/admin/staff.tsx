import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { grantRole, listStaff, revokeRole } from "@/lib/admin.functions";
import { useAdminProfile } from "./route";

export const Route = createFileRoute("/_authenticated/admin/staff")({
  head: () => ({
    meta: [
      { title: "Roles & Staff | Quayside Peri Peri Admin" },
      { name: "description", content: "Grant and revoke admin and staff roles for Quayside Peri Peri." },
      { property: "og:title", content: "Roles & Staff — Quayside Peri Peri Admin" },
      { property: "og:description", content: "Role-based access control management." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StaffPage,
});

function StaffPage() {
  const queryClient = useQueryClient();
  const { data: me } = useAdminProfile();
  const fetchStaff = useServerFn(listStaff);
  const grant = useServerFn(grantRole);
  const revoke = useServerFn(revokeRole);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "staff">("staff");

  const isAdmin = me?.isAdmin === true;

  const staffQuery = useQuery({
    queryKey: ["admin", "staff"],
    queryFn: () => fetchStaff(),
    enabled: isAdmin,
  });

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin", "staff"] });
    void queryClient.invalidateQueries({ queryKey: ["admin", "audit"] });
    void queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
  };

  const grantMutation = useMutation({
    mutationFn: () => grant({ data: { email, role } }),
    onSuccess: () => {
      toast.success(`Granted ${role} to ${email}`);
      setEmail("");
      invalidate();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not grant role"),
  });

  const revokeMutation = useMutation({
    mutationFn: (roleRowId: string) => revoke({ data: { roleRowId } }),
    onSuccess: () => {
      toast.success("Role revoked");
      invalidate();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not revoke role"),
  });

  if (!isAdmin) {
    return (
      <p className="rounded-3xl border border-border bg-card/60 p-6 text-sm text-muted-foreground">
        Only a Super Admin can manage roles. You have staff access, which covers orders and the audit
        log.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          grantMutation.mutate();
        }}
        className="rounded-3xl border border-border bg-card/60 p-6"
      >
        <h2 className="font-display text-2xl leading-none">Grant a role</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          The person must already have an account. Roles are stored separately from profiles and every
          change is audited.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto_auto] sm:items-end">
          <div className="space-y-1.5">
            <Label htmlFor="staffEmail">Account email</Label>
            <Input
              id="staffEmail"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="staffRole">Role</Label>
            <select
              id="staffRole"
              value={role}
              onChange={(e) => setRole(e.target.value as "admin" | "staff")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="staff">Staff</option>
              <option value="admin">Super Admin</option>
            </select>
          </div>
          <Button
            type="submit"
            disabled={grantMutation.isPending}
            className="rounded-full bg-gradient-fire font-bold uppercase"
          >
            {grantMutation.isPending && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />}
            Grant
          </Button>
        </div>
      </form>

      <div className="rounded-3xl border border-border bg-card/60 p-6">
        <h2 className="font-display text-2xl leading-none">Current roles</h2>
        {staffQuery.isLoading ? (
          <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
        ) : !staffQuery.data?.length ? (
          <p className="mt-4 text-sm text-muted-foreground">No roles assigned yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {staffQuery.data.map((row) => (
              <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-semibold text-foreground">
                    {row.fullName ?? row.email ?? row.userId}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {row.email} · {row.role === "admin" ? "Super Admin" : "Staff"} · since{" "}
                    {new Date(row.createdAt).toLocaleDateString("en-GB")}
                    {row.isSelf ? " · you" : ""}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={row.isSelf || revokeMutation.isPending}
                  onClick={() => revokeMutation.mutate(row.id)}
                  className="rounded-full text-destructive"
                >
                  <Trash2 className="mr-1.5 size-4" aria-hidden />
                  Revoke
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
