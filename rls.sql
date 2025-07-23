-- Activer RLS sur toutes les tables Stripe
ALTER TABLE public.stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plan_limits ENABLE ROW LEVEL SECURITY;

-- Politiques pour stripe_customers
CREATE POLICY "Users can view their own stripe customer data" ON public.stripe_customers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.utilisateurs u
      WHERE u.id = stripe_customers.utilisateur_id
      AND u.id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own stripe customer data" ON public.stripe_customers
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.utilisateurs u
      WHERE u.id = stripe_customers.utilisateur_id
      AND u.id = auth.uid()
    )
  );

-- Politiques pour subscription_plans (lecture publique pour affichage des tarifs)
CREATE POLICY "Anyone can view active subscription plans" ON public.subscription_plans
  FOR SELECT USING (active = true);

-- Politiques pour subscriptions
CREATE POLICY "Users can view subscriptions of their organisation" ON public.subscriptions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.utilisateurs u
      WHERE u.id = auth.uid()
      AND (
        u.id = subscriptions.utilisateur_id
        OR u.organisation_id = subscriptions.organisation_id
      )
    )
  );

CREATE POLICY "Users can update their own subscriptions" ON public.subscriptions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.utilisateurs u
      WHERE u.id = auth.uid()
      AND u.id = subscriptions.utilisateur_id
    )
  );

-- Politiques pour invoices
CREATE POLICY "Users can view invoices of their subscriptions" ON public.invoices
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.subscriptions s
      JOIN public.utilisateurs u ON u.id = s.utilisateur_id OR u.organisation_id = s.organisation_id
      WHERE s.id = invoices.subscription_id
      AND u.id = auth.uid()
    )
  );

-- Politiques pour plan_limits (lecture publique)
CREATE POLICY "Anyone can view plan limits" ON public.plan_limits
  FOR SELECT USING (true);

-- Politiques pour stripe_webhooks (accès service uniquement)
CREATE POLICY "Service role can manage webhooks" ON public.stripe_webhooks
  FOR ALL USING (auth.role() = 'service_role');

-- Créer des fonctions helper pour vérifier les permissions
CREATE OR REPLACE FUNCTION is_organisation_admin(p_organisation_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.utilisateurs
    WHERE id = auth.uid()
    AND organisation_id = p_organisation_id
    AND role IN ('admin_organisation', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_user_organisation_id()
RETURNS uuid AS $$
BEGIN
  RETURN (
    SELECT organisation_id FROM public.utilisateurs
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
