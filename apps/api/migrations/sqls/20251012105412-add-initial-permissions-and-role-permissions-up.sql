-- =========================================================
-- Initial Roles for Obie Money Application
-- =========================================================
INSERT INTO roles (id, name, type, description, status)
VALUES
    (1, 'Super Admin', 'SUPER_ADMIN', NULL, 'ACTIVE'),
    (2, 'Obie User', 'OBIE_USER', NULL, 'ACTIVE');

-- =========================================================
-- Initial Permissions
-- =========================================================
INSERT INTO permissions (name, status)
VALUES
    ('GENERAL', 'ACTIVE'),
    ('TWO_FA', 'ACTIVE'),
    ('PROFILE_MANAGEMENT', 'ACTIVE'),
    ('FORM_MANAGEMENT', 'ACTIVE');

-- =========================================================
-- Initial Role Permissions for Super Admin
-- =========================================================
INSERT INTO role_permissions (role_id, permission_id)
VALUES
    (
        (SELECT id FROM roles WHERE type = 'SUPER_ADMIN'),
        (SELECT id FROM permissions WHERE name = 'GENERAL')
    ),
    (
        (SELECT id FROM roles WHERE type = 'SUPER_ADMIN'),
        (SELECT id FROM permissions WHERE name = 'TWO_FA')
    ),
    (
        (SELECT id FROM roles WHERE type = 'SUPER_ADMIN'),
        (SELECT id FROM permissions WHERE name = 'PROFILE_MANAGEMENT')
    ),
    (
        (SELECT id FROM roles WHERE type = 'SUPER_ADMIN'),
        (SELECT id FROM permissions WHERE name = 'FORM_MANAGEMENT')
    ),
    (
        (SELECT ID FROM roles WHERE type = 'OBIE_USER'),
        (SELECT ID FROM permissions WHERE name = 'GENERAL')
    ),
    (
        (SELECT ID FROM roles WHERE type = 'OBIE_USER'),
        (SELECT ID FROM permissions WHERE name = 'TWO_FA')
    ),
    (
        (SELECT ID FROM roles WHERE type = 'OBIE_USER'),
        (SELECT ID FROM permissions WHERE name = 'PROFILE_MANAGEMENT')
    ),
    (
        (SELECT ID FROM roles WHERE type = 'OBIE_USER'),
        (SELECT ID FROM permissions WHERE name = 'FORM_MANAGEMENT')
    );

-- =========================================================
-- Initial Super Admin User
-- =========================================================
INSERT INTO users ( email, password, salt, status, created_by, updated_by)
VALUES (
    'admin@obiemoney.com',
    '$2b$11$HLU0bkTq1.QGFMVPoeZDquXmxw5Wrf8FSofztRwserWb6zbUF9KoW',  
    '$2b$11$HLU0bkTq1.QGFMVPoeZDqu',
    'ACTIVE',
    0,
    0
);

INSERT INTO user_details (
    user_id,
    first_name,
    last_name,
    profile_picture_path,
    created_by,
    updated_by
)
VALUES (
    (SELECT id FROM users WHERE email = 'admin@obiemoney.com'),
    'Super',
    'Admin',
    NULL,
    1,
    1
);


-- =========================================================
-- Assign Super Admin Role to the User
-- =========================================================
INSERT INTO user_roles (user_id, role_id)
VALUES (
    (SELECT id FROM users WHERE email = 'admin@obiemoney.com'),
    1
);
