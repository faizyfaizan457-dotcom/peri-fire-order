CREATE TYPE public.order_type AS ENUM ('collection','delivery');
CREATE TYPE public.order_status AS ENUM ('new','confirmed','preparing','ready','out_for_delivery','completed','cancelled','refunded');
CREATE TYPE public.payment_status AS ENUM ('pending','paid','failed','refunded');

CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  type public.order_type NOT NULL,
  status public.order_status NOT NULL DEFAULT 'new',
  payment_status public.payment_status NOT NULL DEFAULT 'pending',
  scheduled_at TIMESTAMPTZ,
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  discount_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  delivery_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  tax_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  tip_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  delivery_address_id UUID REFERENCES public.addresses(id) ON DELETE SET NULL,
  delivery_address_json JSONB,
  notes TEXT,
  source TEXT NOT NULL DEFAULT 'web',
  payment_intent_id TEXT,
  payment_provider TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers can view own orders" ON public.orders FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can manage orders" ON public.orders FOR ALL TO authenticated USING ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))));

CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT,
  product_name TEXT NOT NULL,
  product_size_label TEXT,
  base_price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  meal_upgrade BOOLEAN NOT NULL DEFAULT false,
  meal_upgrade_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  line_total NUMERIC(10,2) NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers can view own order items" ON public.order_items FOR SELECT TO authenticated USING ((SELECT EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid())));
CREATE POLICY "Admins can manage order items" ON public.order_items FOR ALL TO authenticated USING ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))));

CREATE TABLE public.order_item_modifiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_item_id UUID NOT NULL REFERENCES public.order_items(id) ON DELETE CASCADE,
  modifier_group_name TEXT NOT NULL,
  modifier_name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.order_item_modifiers TO authenticated;
GRANT ALL ON public.order_item_modifiers TO service_role;
ALTER TABLE public.order_item_modifiers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers can view own order item modifiers" ON public.order_item_modifiers FOR SELECT TO authenticated USING ((SELECT EXISTS (SELECT 1 FROM public.order_items oi JOIN public.orders o ON o.id = oi.order_id WHERE oi.id = order_item_id AND o.user_id = auth.uid())));
CREATE POLICY "Admins can manage order item modifiers" ON public.order_item_modifiers FOR ALL TO authenticated USING ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))));

CREATE TABLE public.order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status public.order_status NOT NULL,
  changed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.order_status_history TO authenticated;
GRANT ALL ON public.order_status_history TO service_role;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers can view own order status history" ON public.order_status_history FOR SELECT TO authenticated USING ((SELECT EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid())));
CREATE POLICY "Admins can manage order status history" ON public.order_status_history FOR ALL TO authenticated USING ((SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))));

CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers can create reviews for own orders" ON public.reviews FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Public can read reviews" ON public.reviews FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.loyalty_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  points INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL CHECK (type IN ('earned','redeemed')),
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.loyalty_points TO authenticated;
GRANT ALL ON public.loyalty_points TO service_role;
ALTER TABLE public.loyalty_points ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own loyalty points" ON public.loyalty_points FOR SELECT TO authenticated USING (profile_id = auth.uid());

CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_status_history_order_id ON public.order_status_history(order_id);
CREATE INDEX idx_reviews_order_id ON public.reviews(order_id);

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_order_items_updated_at BEFORE UPDATE ON public.order_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_notifications;