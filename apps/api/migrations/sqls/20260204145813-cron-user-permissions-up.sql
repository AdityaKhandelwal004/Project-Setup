/* Replace with your SQL commands */-- =========================================================
-- Initial Roles for Obie Money Application
-- =========================================================
INSERT INTO roles (id, name, type, description, status)
VALUES
    (3, 'Cron executor', 'CRON_EXECUTOR', NULL, 'ACTIVE');

-- =========================================================
-- Initial Permissions
-- =========================================================
INSERT INTO permissions (name, status)
VALUES
    ('CRON_MANAGEMENT', 'ACTIVE');

-- =========================================================
-- Initial Role Permissions for Super Admin
-- =========================================================
INSERT INTO role_permissions (role_id, permission_id)
VALUES
    (
        (SELECT id FROM roles WHERE type = 'CRON_EXECUTOR'),
        (SELECT id FROM permissions WHERE name = 'CRON_MANAGEMENT')
    );

-- =========================================================
-- Initial Super Admin User
-- =========================================================
INSERT INTO users ( email, password, salt, status, created_by, updated_by)
VALUES (
    'cronexecutor@obiemoney.com',
    '$2b$11$zr86I0V3bz3xlWMktSRU0ebrRBzXE6B23Ph264B5HIDJbX7nOlWRy',  
    '$2b$11$zr86I0V3bz3xlWMktSRU0e',
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
    (SELECT id FROM users WHERE email = 'cronexecutor@obiemoney.com'),
    'Cron',
    'Executor',
    NULL,
    1,
    1
);


-- =========================================================
-- Assign Super Admin Role to the User
-- =========================================================
INSERT INTO user_roles (user_id, role_id)
VALUES (
    (SELECT id FROM users WHERE email = 'cronexecutor@obiemoney.com'),
    (SELECT id FROM roles WHERE type = 'CRON_EXECUTOR')
);
