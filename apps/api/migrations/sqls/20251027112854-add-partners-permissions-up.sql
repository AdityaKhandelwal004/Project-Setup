INSERT INTO permissions (name, description, status)
VALUES 
  ('PARTNER_MANAGEMENT', 'Manage partner with create and update operations', 'ACTIVE'),
  ('PARTNERS_CATEGORY_MANAGEMENT', 'Manage partner categories with create and update operations', 'ACTIVE'),
  ('PARTNER_MANAGEMENT_READ_ONLY', 'Read only access to partners', 'ACTIVE'),
  ('PARTNERS_CATEGORY_MANAGEMENT_READ_ONLY', 'Read only access to partner categories', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
VALUES
  (
    (SELECT id FROM roles WHERE type = 'SUPER_ADMIN'),
    (SELECT id FROM permissions WHERE name = 'PARTNER_MANAGEMENT')
  ),
  (
    (SELECT id FROM roles WHERE type = 'SUPER_ADMIN'),
    (SELECT id FROM permissions WHERE name = 'PARTNERS_CATEGORY_MANAGEMENT')
  ),
  (
    (SELECT id FROM roles WHERE type = 'OBIE_USER'),
    (SELECT id FROM permissions WHERE name = 'PARTNER_MANAGEMENT_READ_ONLY')
  ),
  (
    (SELECT id FROM roles WHERE type = 'OBIE_USER'),
    (SELECT id FROM permissions WHERE name = 'PARTNERS_CATEGORY_MANAGEMENT_READ_ONLY')
  )
ON CONFLICT DO NOTHING;