import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { FEATURE_KEY_PATTERN } from "@/lib/feature-areas";

const keySchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(FEATURE_KEY_PATTERN, "Use 2-32 lowercase letters, numbers, hyphens or underscores");

export const listFeatureAreas = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    const { data: isStaff } = await supabase.rpc("has_role", { _user_id: userId, _role: "staff" });
    if (isAdmin !== true && isStaff !== true) throw new Error("Forbidden: staff role required");

    const { data, error } = await supabase
      .from("feature_areas")
      .select("id, key, label, hint, sort_order, active")
      .order("sort_order", { ascending: true })
      .order("label", { ascending: true });
    if (error) throw new Error(error.message);

    return (data ?? []).map((r) => ({
      id: r.id,
      key: r.key,
      label: r.label,
      hint: r.hint,
      sortOrder: r.sort_order,
      active: r.active,
    }));
  });

export const createFeatureArea = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        key: keySchema,
        label: z.string().trim().min(2).max(60),
        hint: z.string().trim().max(160).optional(),
        sortOrder: z.number().int().min(0).max(9999).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (isAdmin !== true) throw new Error("Forbidden: admin role required");

    const { error } = await supabase.from("feature_areas").insert({
      key: data.key,
      label: data.label,
      hint: data.hint || null,
      sort_order: data.sortOrder ?? 100,
    });
    if (error) {
      if (/duplicate|unique/i.test(error.message)) {
        throw new Error("A feature area with that key already exists.");
      }
      throw new Error(error.message);
    }

    // Seed sensible permissions: admin gets full access, staff none.
    await supabase.from("role_permissions").upsert(
      [
        { role: "admin" as const, feature: data.key, can_view: true, can_manage: true },
        { role: "staff" as const, feature: data.key, can_view: false, can_manage: false },
      ],
      { onConflict: "role,feature" },
    );

    return { ok: true as const };
  });

export const updateFeatureArea = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().uuid(),
        label: z.string().trim().min(2).max(60).optional(),
        hint: z.string().trim().max(160).nullable().optional(),
        sortOrder: z.number().int().min(0).max(9999).optional(),
        active: z.boolean().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (isAdmin !== true) throw new Error("Forbidden: admin role required");

    const patch: Record<string, unknown> = {};
    if (data.label !== undefined) patch["label"] = data.label;
    if (data.hint !== undefined) patch["hint"] = data.hint || null;
    if (data.sortOrder !== undefined) patch["sort_order"] = data.sortOrder;
    if (data.active !== undefined) patch["active"] = data.active;
    if (Object.keys(patch).length === 0) return { ok: true as const };

    const { error } = await supabase.from("feature_areas").update(patch).eq("id", data.id);
    if (error) throw new Error(error.message);

    return { ok: true as const };
  });

export const deleteFeatureArea = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (isAdmin !== true) throw new Error("Forbidden: admin role required");

    const { data: row } = await supabase
      .from("feature_areas")
      .select("id, key")
      .eq("id", data.id)
      .maybeSingle();
    if (!row) throw new Error("Feature area not found.");
    if (row.key === "staff") throw new Error("Roles & staff cannot be removed.");

    const { error } = await supabase.from("feature_areas").delete().eq("id", data.id);
    if (error) throw new Error(error.message);

    await supabase.from("role_permissions").delete().eq("feature", row.key);

    return { ok: true as const };
  });
