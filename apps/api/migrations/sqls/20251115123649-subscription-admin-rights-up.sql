-- =========================================================
-- Permissions
-- =========================================================
INSERT INTO permissions (name, description, status)
VALUES 
  ('SUBSCRIPTION_MANAGEMENT_ADMIN', 'Manage subscription with rights to extend trial and subscription periods', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
VALUES
    (
        (SELECT id FROM roles WHERE type = 'SUPER_ADMIN'),
        (SELECT id FROM permissions WHERE name = 'SUBSCRIPTION_MANAGEMENT_ADMIN')
    );

