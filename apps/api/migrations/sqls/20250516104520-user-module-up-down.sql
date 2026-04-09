-- =========================================================
-- AUTHENTICATION & SECURITY
-- =========================================================
DROP TABLE IF EXISTS user_login_history CASCADE;
DROP TABLE IF EXISTS password_reset_tokens CASCADE;
DROP TABLE IF EXISTS password_reset_history CASCADE;
DROP TABLE IF EXISTS verify_email_tokens CASCADE;

-- =========================================================
-- USER & PROFILE INFORMATION
-- =========================================================
DROP TABLE IF EXISTS user_details CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- =========================================================
-- ROLES & PERMISSIONS
-- =========================================================
DROP TABLE IF EXISTS role_permissions CASCADE;
DROP TABLE IF EXISTS user_permissions CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS permissions CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- =========================================================
-- USER CONSENTS & OTHER FEATURES
-- =========================================================
DROP TABLE IF EXISTS user_consents CASCADE;

-- =========================================================
-- Delete all roles to reset auto-increment IDs as well
-- =========================================================
DROP TABLE IF EXISTS roles CASCADE;
