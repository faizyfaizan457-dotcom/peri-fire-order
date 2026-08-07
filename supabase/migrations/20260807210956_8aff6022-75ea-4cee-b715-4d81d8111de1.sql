CREATE TABLE public.feature_areas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  hint TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.feature_areas TO authenticated;
GRANT ALL ON public.feature_areas TO service_role;

ALTER TABLE public.feature_areas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Signed-in users can view feature areas"
ON public.feature_areas FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Admins can insert feature areas"
ON public.feature_areas FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update feature areas"
ON public.feature_areas FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete feature areas"
ON public.feature_areas FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_feature_areas_updated_at
BEFORE UPDATE ON public.feature_areas
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.audit_feature_areas()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO public.audit_logs (table_name, record_id, action, changed_by, old_data)
    VALUES ('feature_areas', OLD.id::text, 'DELETE', auth.uid(), to_jsonb(OLD));
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO public.audit_logs (table_name, record_id, action, changed_by, old_data, new_data)
    VALUES ('feature_areas', NEW.id::text, 'UPDATE', auth.uid(), to_jsonb(OLD), to_jsonb(NEW));
    RETURN NEW;
  ELSE
    INSERT INTO public.audit_logs (table_name, record_id, action, changed_by, new_data)
    VALUES ('feature_areas', NEW.id::text, 'INSERT', auth.uid(), to_jsonb(NEW));
    RETURN NEW;
  END IF;
END;
$$;

CREATE TRIGGER audit_feature_areas_changes
AFTER INSERT OR UPDATE OR DELETE ON public.feature_areas
FOR EACH ROW EXECUTE FUNCTION public.audit_feature_areas();

INSERT INTO public.feature_areas (key, label, hint, sort_order) VALUES
  ('orders', 'Orders', 'Live order queue, status changes, refunds', 10),
  ('menu', 'Menu', 'Categories, dishes, sizes and modifiers', 20),
  ('deals', 'Deals & codes', 'Promotions and discount codes', 30),
  ('delivery', 'Delivery', 'Postcode zones, fees and minimums', 40),
  ('customers', 'Customers', 'Customer profiles and history', 50),
  ('analytics', 'Analytics', 'Revenue, stats and reporting', 60),
  ('settings', 'Restaurant settings', 'Hours, tax, contact details', 70),
  ('staff', 'Roles & staff', 'Grant or revoke access', 80),
  ('audit', 'Audit log', 'Immutable record of admin actions', 90);