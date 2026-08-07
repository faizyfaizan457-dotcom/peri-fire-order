CREATE TABLE public.role_permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role public.app_role NOT NULL,
  feature TEXT NOT NULL,
  can_view BOOLEAN NOT NULL DEFAULT false,
  can_manage BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (role, feature)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.role_permissions TO authenticated;
GRANT ALL ON public.role_permissions TO service_role;

ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Signed-in users can read the permissions matrix"
ON public.role_permissions FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can insert permissions"
ON public.role_permissions FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update permissions"
ON public.role_permissions FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete permissions"
ON public.role_permissions FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_role_permissions_updated_at
BEFORE UPDATE ON public.role_permissions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.audit_role_permissions()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO public.audit_logs (table_name, record_id, action, changed_by, old_data)
    VALUES ('role_permissions', OLD.id::text, 'DELETE', auth.uid(), to_jsonb(OLD));
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO public.audit_logs (table_name, record_id, action, changed_by, old_data, new_data)
    VALUES ('role_permissions', NEW.id::text, 'UPDATE', auth.uid(), to_jsonb(OLD), to_jsonb(NEW));
    RETURN NEW;
  ELSE
    INSERT INTO public.audit_logs (table_name, record_id, action, changed_by, new_data)
    VALUES ('role_permissions', NEW.id::text, 'INSERT', auth.uid(), to_jsonb(NEW));
    RETURN NEW;
  END IF;
END;
$$;

CREATE TRIGGER audit_role_permissions_changes
AFTER INSERT OR UPDATE OR DELETE ON public.role_permissions
FOR EACH ROW EXECUTE FUNCTION public.audit_role_permissions();

CREATE OR REPLACE FUNCTION public.has_permission(_user_id uuid, _feature text, _manage boolean DEFAULT false)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON rp.role = ur.role
    WHERE ur.user_id = _user_id
      AND rp.feature = _feature
      AND (CASE WHEN _manage THEN rp.can_manage ELSE rp.can_view END)
  );
$$;

REVOKE ALL ON FUNCTION public.has_permission(uuid, text, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_permission(uuid, text, boolean) TO authenticated, service_role;

INSERT INTO public.role_permissions (role, feature, can_view, can_manage) VALUES
  ('admin', 'orders', true, true),
  ('admin', 'menu', true, true),
  ('admin', 'deals', true, true),
  ('admin', 'delivery', true, true),
  ('admin', 'customers', true, true),
  ('admin', 'analytics', true, true),
  ('admin', 'settings', true, true),
  ('admin', 'staff', true, true),
  ('admin', 'audit', true, true),
  ('staff', 'orders', true, true),
  ('staff', 'menu', true, false),
  ('staff', 'deals', true, false),
  ('staff', 'delivery', true, false),
  ('staff', 'customers', true, false),
  ('staff', 'analytics', false, false),
  ('staff', 'settings', false, false),
  ('staff', 'staff', false, false),
  ('staff', 'audit', true, false);
