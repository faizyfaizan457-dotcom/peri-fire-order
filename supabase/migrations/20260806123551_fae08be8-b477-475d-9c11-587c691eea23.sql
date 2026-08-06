REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.log_audit(TEXT, TEXT, TEXT, JSONB, JSONB) FROM anon;
REVOKE EXECUTE ON FUNCTION public.claim_first_admin() FROM anon;
REVOKE EXECUTE ON FUNCTION public.admin_bootstrap_open() FROM anon;
REVOKE EXECUTE ON FUNCTION public.audit_user_roles() FROM anon, authenticated;