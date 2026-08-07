import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const roleSchema = z.enum(["admin", "staff"]);

export const getMyAdminProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId, claims } = context;

    const [{ data: roleRows }, { data: profile }, { data: bootstrapOpen }] = await Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", userId),
      supabase.from("profiles").select("id, email, full_name, phone").eq("id", userId).maybeSingle(),
      supabase.rpc("admin_bootstrap_open"),
    ]);

    const roles = (roleRows ?? []).map((r) => r.role as "admin" | "staff");

    return {
      userId,
      email: (claims["email"] as string | undefined) ?? profile?.email ?? null,
      fullName: profile?.full_name ?? null,
      phone: profile?.phone ?? null,
      roles,
      isAdmin: roles.includes("admin"),
      isStaff: roles.includes("staff") || roles.includes("admin"),
      bootstrapOpen: bootstrapOpen === true,
    };
  });

export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.rpc("claim_first_admin");
    if (error) throw new Error(error.message);
    await supabase.rpc("log_audit", {
      _table_name: "user_roles",
      _record_id: userId,
      _action: "first_admin_claimed",
      _new_data: { user_id: userId, role: "admin" },
    });
    return { ok: true as const };
  });

export const listStaff = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (isAdmin !== true) throw new Error("Forbidden: admin role required");

    const { data: roleRows, error } = await supabase
      .from("user_roles")
      .select("id, user_id, role, created_at")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);

    const ids = [...new Set((roleRows ?? []).map((r) => r.user_id))];
    const { data: profiles } = ids.length
      ? await supabase.from("profiles").select("id, email, full_name").in("id", ids)
      : { data: [] as { id: string; email: string | null; full_name: string | null }[] };

    const byId = new Map((profiles ?? []).map((p) => [p.id, p]));

    return (roleRows ?? []).map((r) => ({
      id: r.id,
      userId: r.user_id,
      role: r.role as "admin" | "staff",
      createdAt: r.created_at,
      email: byId.get(r.user_id)?.email ?? null,
      fullName: byId.get(r.user_id)?.full_name ?? null,
      isSelf: r.user_id === userId,
    }));
  });

export const listCustomers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    const { data: isStaff } = await supabase.rpc("has_role", { _user_id: userId, _role: "staff" });
    if (isAdmin !== true && isStaff !== true) throw new Error("Forbidden: staff role required");

    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, phone, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const grantRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ email: z.string().email(), role: roleSchema }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (isAdmin !== true) throw new Error("Forbidden: admin role required");

    const email = data.email.trim().toLowerCase();
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, email")
      .ilike("email", email)
      .maybeSingle();

    if (!profile) {
      throw new Error("No account found with that email. Ask them to sign up first.");
    }

    const { error } = await supabase
      .from("user_roles")
      .insert({ user_id: profile.id, role: data.role });
    if (error) {
      if (error.code === "23505" || error.code === "23205" || /duplicate/i.test(error.message)) {
        throw new Error("That account already has this role.");
      }
      throw new Error(error.message);
    }

    return { ok: true as const, email: profile.email };
  });

export const revokeRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ roleRowId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (isAdmin !== true) throw new Error("Forbidden: admin role required");

    const { data: row } = await supabase
      .from("user_roles")
      .select("id, user_id, role")
      .eq("id", data.roleRowId)
      .maybeSingle();

    if (!row) throw new Error("Role assignment not found.");
    if (row.user_id === userId) throw new Error("You cannot revoke your own role.");

    const { error } = await supabase.from("user_roles").delete().eq("id", data.roleRowId);
    if (error) throw new Error(error.message);

    return { ok: true as const };
  });

export const listAuditLogs = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        limit: z.number().int().min(1).max(200).optional(),
        table: z.string().max(64).optional(),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    const { data: isStaff } = await supabase.rpc("has_role", { _user_id: userId, _role: "staff" });
    if (isAdmin !== true && isStaff !== true) throw new Error("Forbidden: staff role required");

    let query = supabase
      .from("audit_logs")
      .select("id, table_name, record_id, action, changed_by, old_data, new_data, created_at")
      .order("created_at", { ascending: false })
      .limit(data.limit ?? 100);

    if (data.table) query = query.eq("table_name", data.table);

    const { data: rows, error } = await query;
    if (error) throw new Error(error.message);

    const actorIds = [...new Set((rows ?? []).map((r) => r.changed_by).filter(Boolean))] as string[];
    const { data: profiles } = actorIds.length
      ? await supabase.from("profiles").select("id, email").in("id", actorIds)
      : { data: [] as { id: string; email: string | null }[] };
    const byId = new Map((profiles ?? []).map((p) => [p.id, p.email]));

    return (rows ?? []).map((r) => ({
      ...r,
      actorEmail: r.changed_by ? byId.get(r.changed_by) ?? null : null,
    }));
  });

export const getAdminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    const { data: isStaff } = await supabase.rpc("has_role", { _user_id: userId, _role: "staff" });
    if (isAdmin !== true && isStaff !== true) throw new Error("Forbidden: staff role required");

    const [customers, staff, audits, orders] = await Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("user_roles").select("id", { count: "exact", head: true }),
      supabase.from("audit_logs").select("id", { count: "exact", head: true }),
      supabase.from("orders").select("id", { count: "exact", head: true }),
    ]);

    return {
      customers: customers.count ?? 0,
      staff: staff.count ?? 0,
      auditEntries: audits.count ?? 0,
      orders: orders.count ?? 0,
    };
  });

const featureKeySchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(FEATURE_KEY_PATTERN, "Invalid feature key");


export const listRolePermissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    const { data: isStaff } = await supabase.rpc("has_role", { _user_id: userId, _role: "staff" });
    if (isAdmin !== true && isStaff !== true) throw new Error("Forbidden: staff role required");

    const { data, error } = await supabase
      .from("role_permissions")
      .select("id, role, feature, can_view, can_manage, updated_at");
    if (error) throw new Error(error.message);

    return (data ?? []).map((r) => ({
      id: r.id,
      role: r.role as "admin" | "staff",
      feature: r.feature,
      canView: r.can_view,
      canManage: r.can_manage,
      updatedAt: r.updated_at,
    }));
  });

export const setRolePermission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        role: roleSchema,
        feature: z.enum(featureKeys),
        canView: z.boolean(),
        canManage: z.boolean(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (isAdmin !== true) throw new Error("Forbidden: admin role required");

    // Managing implies viewing; admins must keep full access to role management.
    const canManage = data.canManage;
    const canView = canManage ? true : data.canView;
    if (data.role === "admin" && data.feature === "staff" && !canManage) {
      throw new Error("Super Admins must keep manage access to Roles & staff.");
    }

    const { error } = await supabase
      .from("role_permissions")
      .upsert(
        { role: data.role, feature: data.feature, can_view: canView, can_manage: canManage },
        { onConflict: "role,feature" },
      );
    if (error) throw new Error(error.message);

    return { ok: true as const, canView, canManage };
  });

export const resetRolePermissions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (isAdmin !== true) throw new Error("Forbidden: admin role required");

    const defaults: { role: "admin" | "staff"; feature: FeatureKey; view: boolean; manage: boolean }[] = [
      ...FEATURE_AREAS.map((f) => ({ role: "admin" as const, feature: f.key, view: true, manage: true })),
      { role: "staff", feature: "orders", view: true, manage: true },
      { role: "staff", feature: "menu", view: true, manage: false },
      { role: "staff", feature: "deals", view: true, manage: false },
      { role: "staff", feature: "delivery", view: true, manage: false },
      { role: "staff", feature: "customers", view: true, manage: false },
      { role: "staff", feature: "analytics", view: false, manage: false },
      { role: "staff", feature: "settings", view: false, manage: false },
      { role: "staff", feature: "staff", view: false, manage: false },
      { role: "staff", feature: "audit", view: true, manage: false },
    ];

    const { error } = await supabase.from("role_permissions").upsert(
      defaults.map((d) => ({
        role: d.role,
        feature: d.feature,
        can_view: d.view,
        can_manage: d.manage,
      })),
      { onConflict: "role,feature" },
    );
    if (error) throw new Error(error.message);

    return { ok: true as const };
  });
