import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  createFeatureArea,
  deleteFeatureArea,
  listFeatureAreas,
  updateFeatureArea,
} from "@/lib/features.functions";
import { useAdminProfile } from "./route";

export const Route = createFileRoute("/_authenticated/admin/features")({
  head: () => ({
    meta: [
      { title: "Feature Areas | Quayside Peri Peri Admin" },
      {
        name: "description",
        content:
          "Add, rename, reorder, deactivate or remove the feature areas that the permissions matrix controls.",
      },
      { property: "og:title", content: "Feature Areas — Quayside Peri Peri Admin" },
      {
        property: "og:description",
        content: "Manage the list of admin feature areas used for role permissions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: FeatureAreasPage,
});

function FeatureAreasPage() {
  const queryClient = useQueryClient();
  const { data: me } = useAdminProfile();
  const isAdmin = me?.isAdmin === true;

  const fetchAreas = useServerFn(listFeatureAreas);
  const createArea = useServerFn(createFeatureArea);
  const updateArea = useServerFn(updateFeatureArea);
  const removeArea = useServerFn(deleteFeatureArea);

  const areasQuery = useQuery({
    queryKey: ["admin", "feature-areas"],
    queryFn: () => fetchAreas(),
  });

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin", "feature-areas"] });
    void queryClient.invalidateQueries({ queryKey: ["admin", "permissions"] });
    void queryClient.invalidateQueries({ queryKey: ["admin", "audit"] });
  };

  const [key, setKey] = useState("");
  const [label, setLabel] = useState("");
  const [hint, setHint] = useState("");

  const createMutation = useMutation({
    mutationFn: (vars: { key: string; label: string; hint?: string | undefined }) =>
      createArea({ data: vars }),
    onSuccess: () => {
      toast.success("Feature area added");
      setKey("");
      setLabel("");
      setHint("");
      invalidate();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not add feature area"),
  });

  const updateMutation = useMutation({
    mutationFn: (vars: {
      id: string;
      label?: string;
      hint?: string | null;
      sortOrder?: number;
      active?: boolean;
    }) => updateArea({ data: vars }),
    onSuccess: invalidate,
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not update feature area"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => removeArea({ data: { id } }),
    onSuccess: () => {
      toast.success("Feature area removed");
      invalidate();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not remove feature area"),
  });

  const areas = areasQuery.data ?? [];

  const move = (index: number, direction: -1 | 1) => {
    const a = areas[index];
    const b = areas[index + direction];
    if (!a || !b) return;
    updateMutation.mutate({ id: a.id, sortOrder: b.sortOrder });
    updateMutation.mutate({ id: b.id, sortOrder: a.sortOrder });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl leading-none">FEATURE AREAS</h2>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
          These are the rows of the{" "}
          <Link to="/admin/permissions" className="text-gold underline">
            permissions matrix
          </Link>
          . Add an area for every part of the admin you want to control, rename or reorder them, or
          switch one off to hide it without losing its saved permissions. Every change is audited.
        </p>
      </div>

      {!isAdmin && (
        <p className="rounded-3xl border border-border bg-card/60 p-6 text-sm text-muted-foreground">
          You have staff access, so this list is read-only.
        </p>
      )}

      {isAdmin && (
        <form
          className="grid gap-4 rounded-3xl border border-border bg-card/60 p-6 sm:grid-cols-[1fr_1fr_1.4fr_auto] sm:items-end"
          onSubmit={(e) => {
            e.preventDefault();
            createMutation.mutate({ key, label, hint: hint || undefined });
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="fa-key">Key</Label>
            <Input
              id="fa-key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="kitchen"
              required
            />
            <p className="text-xs text-muted-foreground">Lowercase, no spaces. Used in code.</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="fa-label">Name</Label>
            <Input
              id="fa-label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Kitchen display"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="fa-hint">Description</Label>
            <Input
              id="fa-hint"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              placeholder="Live tickets for the kitchen screen"
            />
          </div>
          <Button
            type="submit"
            disabled={createMutation.isPending}
            className="rounded-full bg-gradient-fire font-bold uppercase"
          >
            {createMutation.isPending ? (
              <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
            ) : (
              <Plus className="mr-2 size-4" aria-hidden />
            )}
            Add area
          </Button>
        </form>
      )}

      {areasQuery.isLoading ? (
        <div className="flex items-center gap-2 rounded-3xl border border-border bg-card/60 p-6 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" aria-hidden /> Loading feature areas…
        </div>
      ) : areasQuery.error ? (
        <p className="rounded-3xl border border-destructive/40 bg-card/60 p-6 text-sm text-destructive">
          {areasQuery.error instanceof Error
            ? areasQuery.error.message
            : "Could not load feature areas."}
        </p>
      ) : areas.length === 0 ? (
        <p className="rounded-3xl border border-border bg-card/60 p-6 text-sm text-muted-foreground">
          No feature areas yet. Add your first one above.
        </p>
      ) : (
        <ul className="divide-y divide-border/60 overflow-hidden rounded-3xl border border-border bg-card/60">
          {areas.map((area, index) => (
            <li key={area.id} className="flex flex-wrap items-center gap-4 p-5">
              <div className="flex-1 min-w-[220px]">
                {isAdmin ? (
                  <input
                    className="w-full bg-transparent font-semibold text-foreground outline-none focus:underline"
                    defaultValue={area.label}
                    aria-label={`Name for ${area.label}`}
                    onBlur={(e) => {
                      const value = e.target.value.trim();
                      if (value && value !== area.label)
                        updateMutation.mutate({ id: area.id, label: value });
                    }}
                  />
                ) : (
                  <span className="block font-semibold text-foreground">{area.label}</span>
                )}
                {isAdmin ? (
                  <input
                    className="mt-0.5 w-full bg-transparent text-xs text-muted-foreground outline-none focus:underline"
                    defaultValue={area.hint ?? ""}
                    placeholder="Add a short description"
                    aria-label={`Description for ${area.label}`}
                    onBlur={(e) => {
                      const value = e.target.value.trim();
                      if (value !== (area.hint ?? ""))
                        updateMutation.mutate({ id: area.id, hint: value });
                    }}
                  />
                ) : (
                  <span className="block text-xs text-muted-foreground">{area.hint}</span>
                )}
                <code className="mt-1 inline-block rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
                  {area.key}
                </code>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{area.active ? "Active" : "Hidden"}</span>
                <Switch
                  checked={area.active}
                  disabled={!isAdmin || updateMutation.isPending}
                  aria-label={`${area.label} visible in permissions matrix`}
                  onCheckedChange={(v) => updateMutation.mutate({ id: area.id, active: v })}
                />
              </div>

              {isAdmin && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    aria-label={`Move ${area.label} up`}
                    disabled={index === 0 || updateMutation.isPending}
                    onClick={() => move(index, -1)}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    aria-label={`Move ${area.label} down`}
                    disabled={index === areas.length - 1 || updateMutation.isPending}
                    onClick={() => move(index, 1)}
                  >
                    ↓
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full text-destructive"
                    aria-label={`Remove ${area.label}`}
                    disabled={deleteMutation.isPending}
                    onClick={() => {
                      if (
                        window.confirm(
                          `Remove "${area.label}"? Its saved permissions will be deleted too.`,
                        )
                      ) {
                        deleteMutation.mutate(area.id);
                      }
                    }}
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
