-- =========================================================
-- Delete all data and restart auto-increment sequences
-- =========================================================

TRUNCATE TABLE 
    user_roles,
    user_consents,
    user_details,
    users,
    role_permissions,
    roles,
    permissions
RESTART IDENTITY CASCADE;

