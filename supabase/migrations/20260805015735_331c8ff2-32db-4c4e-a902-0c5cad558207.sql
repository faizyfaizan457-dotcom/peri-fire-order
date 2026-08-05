DROP POLICY IF EXISTS "Admins can update restaurant settings" ON public.restaurant_settings;
CREATE POLICY "Admins can update restaurant settings" ON public.restaurant_settings
FOR UPDATE TO authenticated
USING ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')))
WITH CHECK ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')));

DROP POLICY IF EXISTS "Public can read active categories" ON public.categories;
CREATE POLICY "Public can read active categories" ON public.categories
FOR SELECT TO anon, authenticated
USING (available = true OR (SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))));

DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
CREATE POLICY "Admins can manage categories" ON public.categories
FOR ALL TO authenticated
USING ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')))
WITH CHECK ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')));

DROP POLICY IF EXISTS "Admins can manage modifier groups" ON public.modifier_groups;
CREATE POLICY "Admins can manage modifier groups" ON public.modifier_groups
FOR ALL TO authenticated
USING ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')))
WITH CHECK ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')));

DROP POLICY IF EXISTS "Public can read available modifiers" ON public.modifiers;
CREATE POLICY "Public can read available modifiers" ON public.modifiers
FOR SELECT TO anon, authenticated
USING (available = true OR (SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))));

DROP POLICY IF EXISTS "Admins can manage modifiers" ON public.modifiers;
CREATE POLICY "Admins can manage modifiers" ON public.modifiers
FOR ALL TO authenticated
USING ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')))
WITH CHECK ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')));

DROP POLICY IF EXISTS "Public can read available products" ON public.products;
CREATE POLICY "Public can read available products" ON public.products
FOR SELECT TO anon, authenticated
USING (available = true OR (SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))));

DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
CREATE POLICY "Admins can manage products" ON public.products
FOR ALL TO authenticated
USING ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')))
WITH CHECK ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')));

DROP POLICY IF EXISTS "Admins can manage product sizes" ON public.product_sizes;
CREATE POLICY "Admins can manage product sizes" ON public.product_sizes
FOR ALL TO authenticated
USING ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')))
WITH CHECK ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')));

DROP POLICY IF EXISTS "Admins can manage product modifiers" ON public.product_modifiers;
CREATE POLICY "Admins can manage product modifiers" ON public.product_modifiers
FOR ALL TO authenticated
USING ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')))
WITH CHECK ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')));

DROP POLICY IF EXISTS "Public can read active deals" ON public.deals;
CREATE POLICY "Public can read active deals" ON public.deals
FOR SELECT TO anon, authenticated
USING ((active = true AND (start_at IS NULL OR start_at <= now()) AND (end_at IS NULL OR end_at >= now())) OR (SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))));

DROP POLICY IF EXISTS "Admins can manage deals" ON public.deals;
CREATE POLICY "Admins can manage deals" ON public.deals
FOR ALL TO authenticated
USING ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')))
WITH CHECK ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')));

DROP POLICY IF EXISTS "Public can read active delivery zones" ON public.delivery_zones;
CREATE POLICY "Public can read active delivery zones" ON public.delivery_zones
FOR SELECT TO anon, authenticated
USING (active = true OR (SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))));

DROP POLICY IF EXISTS "Admins can manage delivery zones" ON public.delivery_zones;
CREATE POLICY "Admins can manage delivery zones" ON public.delivery_zones
FOR ALL TO authenticated
USING ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')))
WITH CHECK ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')));

DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_logs;
CREATE POLICY "Admins can view audit logs" ON public.audit_logs
FOR SELECT TO authenticated
USING ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))));

DROP POLICY IF EXISTS "Admins can view and mark notifications" ON public.admin_notifications;
CREATE POLICY "Admins can view and mark notifications" ON public.admin_notifications
FOR ALL TO authenticated
USING ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))))
WITH CHECK ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))));

DROP FUNCTION IF EXISTS public.has_role(UUID, public.app_role);

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, PUBLIC;