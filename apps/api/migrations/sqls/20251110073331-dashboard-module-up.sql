-- =========================================================
-- Permissions
-- =========================================================
INSERT INTO permissions (name, description, status)
VALUES 
  ('DASHBOARD_MANAGEMENT', 'Manage users to see dashboard insights to modules', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
VALUES
    (
        (SELECT id FROM roles WHERE type = 'OBIE_USER'),
        (SELECT id FROM permissions WHERE name = 'DASHBOARD_MANAGEMENT')
    );
