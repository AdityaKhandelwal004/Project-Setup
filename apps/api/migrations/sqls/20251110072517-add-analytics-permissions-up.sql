-- =========================================================
-- Permissions
-- =========================================================
INSERT INTO permissions (name, description, status)
VALUES 
  ('ANALYTICS', 'See analytics of the system', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
VALUES
  (
    (SELECT id FROM roles WHERE type = 'SUPER_ADMIN'),
    (SELECT id FROM permissions WHERE name = 'ANALYTICS')
  );