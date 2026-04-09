INSERT INTO permissions (name, description, status)
VALUES 
  ('LEARN_RESOURCES_MANAGEMENT', 'Manage learn resources with create and update operations', 'ACTIVE'),
  ('LEARN_RESOURCES_MANAGEMENT_READ_ONLY', 'Read only access to learn resources', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
VALUES
  (
    (SELECT id FROM roles WHERE type = 'SUPER_ADMIN'),
    (SELECT id FROM permissions WHERE name = 'LEARN_RESOURCES_MANAGEMENT')
  ),
  (
    (SELECT id FROM roles WHERE type = 'OBIE_USER'),
    (SELECT id FROM permissions WHERE name = 'LEARN_RESOURCES_MANAGEMENT_READ_ONLY')
  )
ON CONFLICT DO NOTHING;
