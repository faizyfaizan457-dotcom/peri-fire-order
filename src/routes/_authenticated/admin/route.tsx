import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { claimFirstAdmin, getMyAdminProfile } from "@/lib/admin.functions";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

const TABS = [
  { to: "/admin", label: "Overview", exact: true },
  { to: "/admin/staff", label: "Roles & staff", exact: false },
  { to: "/admin/permissions", label: "Permissions", exact: false },
  { to: "/admin/features", label: "Feature areas", exact: false },
  { to: "/admin/audit", label: "Audit log", exact: false },
] as const;

export function useAdminProfile() {
  const fetchProfile = useServerFn(getMyAdminProfile);
  return useQuery({
    queryKey: ["admin", "me"],
    queryFn: () => fetchProfile(),
    staleTime: 30_000,
  });
}

function AdminLayout() {
  const { data, isLoading, error, refetch } = useAdminProfile();
  const { signOut, refreshRoles } = useAuth();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const claim = useServerFn(claimFirstAdmin);

  const claimMutation = useMutation({
    mutationFn: () => claim(),
    onSuccess: async () => {
      toast.success("You are now the Super Admin.");
      await refreshRoles();
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
      await refetch();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not claim admin"),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-gold" aria-hidden />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center lg:px-8">
        <ShieldAlert className="mx-auto size-8 text-destructive" aria-hidden />
        <h1 className="mt-4 font-display text-4xl leading-none">VERIFICATION FAILED</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn't verify your admin profile. Try signing in again.
        </p>
        <Button onClick={signOut} className="mt-6 rounded-full bg-gradient-fire font-bold uppercase">
          Sign out
        </Button>
      </div>
    );
  }

  if (!data.isStaff) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center lg:px-8">
        <ShieldAlert className="mx-auto size-8 text-destructive" aria-hidden />
        <h1 className="mt-4 font-display text-4xl leading-none">NO ACCESS</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Signed in as <span className="text-foreground">{data.email}</span>, but this account has no
          admin or staff role.
        </p>

        {data.bootstrapOpen ? (
          <div className="mt-8 rounded-3xl border border-gold/40 bg-card/60 p-6 text-left">
            <h2 className="font-display text-2xl leading-none">Claim Super Admin</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              No administrator exists yet, so this one-time setup is still open. Claiming it grants
              your account the admin role and writes an audit entry. Once claimed, this closes
              permanently.
            </p>
            <Button
              onClick={() => claimMutation.mutate()}
              disabled={claimMutation.isPending}
              className="mt-4 w-full rounded-full bg-gradient-fire font-bold uppercase shadow-glow"
            >
              {claimMutation.isPending && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />}
              Make me Super Admin
            </Button>
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">
            Ask an existing administrator to grant your account access.
          </p>
        )}

        <div className="mt-6 flex justify-center gap-3">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/account">Back to my account</Link>
          </Button>
          <Button variant="ghost" onClick={signOut} className="rounded-full">
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold">
            <ShieldCheck className="size-5" aria-hidden />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              {data.isAdmin ? "Super Admin" : "Staff"}
            </span>
          </div>
          <h1 className="mt-2 font-display text-5xl leading-none">ADMIN</h1>
          <p className="mt-1 text-sm text-muted-foreground">{data.email}</p>
        </div>
        <Button variant="outline" onClick={signOut} className="rounded-full">
          Sign out
        </Button>
      </div>

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Admin sections">
        {TABS.map((tab) => {
          const active = tab.exact ? pathname === tab.to : pathname.startsWith(tab.to);
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
}
