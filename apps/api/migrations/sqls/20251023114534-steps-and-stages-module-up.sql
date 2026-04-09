-- =========================================================
-- TABLE: system_stages
-- =========================================================
CREATE TABLE system_stages (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR NOT NULL UNIQUE,
    name VARCHAR NOT NULL UNIQUE,
    description TEXT,
    status status_enum NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_system_stages_updated_on
    BEFORE UPDATE ON system_stages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();

-- =========================================================
-- TABLE: system_steps
-- =========================================================
CREATE TABLE system_steps (
    id BIGSERIAL PRIMARY KEY,
    system_stage_id BIGINT NOT NULL REFERENCES system_stages(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    code VARCHAR NOT NULL UNIQUE,
    name VARCHAR NOT NULL UNIQUE,
    description TEXT,
    status status_enum NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_system_steps_updated_on
    BEFORE UPDATE ON system_steps
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();

-- =========================================================
-- TABLE: user_stages
-- =========================================================
CREATE TABLE user_stages (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    code VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    description TEXT,
    status VARCHAR(40) NOT NULL DEFAULT 'NOT_STARTED',
    started_on TIMESTAMP,
    completed_on TIMESTAMP,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_stages_updated_on
    BEFORE UPDATE ON user_stages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();
-- =========================================================
-- TABLE: user_steps
-- =========================================================
CREATE TABLE user_steps (
    id BIGSERIAL PRIMARY KEY,
    user_stage_id BIGINT NOT NULL REFERENCES user_stages(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    code VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    description TEXT,
    status VARCHAR(40) NOT NULL DEFAULT 'NOT_STARTED',
    started_on TIMESTAMP,
    completed_on TIMESTAMP,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_steps_updated_on
    BEFORE UPDATE ON user_steps
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();

-- =========================
-- Permissions
-- =========================
INSERT INTO permissions (name, description, status)
VALUES 
  -- Safety Net Management Permissions
  ('USER_STAGE_MANAGEMENT', 'Manage stages with create and update operations', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

-- =========================
-- Assign Permissions to Roles
-- =========================
INSERT INTO role_permissions (role_id, permission_id)
VALUES
    (
        (SELECT id FROM roles WHERE type = 'OBIE_USER'),
        (SELECT id FROM permissions WHERE name = 'USER_STAGE_MANAGEMENT')
    );


-- =========================================================
-- SEED DATA FOR system_stages AND system_steps
-- =========================================================
INSERT INTO system_stages (code, name, description, status, created_by, updated_by) VALUES
('OPTIMIZE', 'Optimize', 'Optimize your income', 'ACTIVE', 1, 1),
('MAXIMIZE', 'Maximize', 'Optimize your assets', 'ACTIVE', 1, 1),
('PROTECT', 'Protect', 'Protect you and yours', 'ACTIVE', 1, 1)
ON CONFLICT (code) DO NOTHING;

INSERT INTO system_steps (system_stage_id, code, name, description, status, created_by, updated_by) VALUES
((SELECT id FROM system_stages WHERE code = 'OPTIMIZE'), 'BUDGET', 'Budget', 'Spend less without feeling like youre missing out', 'ACTIVE', 1, 1),
((SELECT id FROM system_stages WHERE code = 'OPTIMIZE'), 'SAFETY_NET', 'Safety net', 'Build your finantial safety net(because life happens)', 'ACTIVE', 1, 1),
((SELECT id FROM system_stages WHERE code = 'OPTIMIZE'), 'DEBT', 'Debt', 'Crush your debt for good', 'ACTIVE', 1, 1),
((SELECT id FROM system_stages WHERE code = 'OPTIMIZE'), 'SAVINGS_GOALS', 'Savings', 'Save more without even thinking about it', 'ACTIVE', 1, 1),
((SELECT id FROM system_stages WHERE code = 'MAXIMIZE'), 'SUPER', 'Super', 'Make your money work for you', 'ACTIVE', 1, 1),
((SELECT id FROM system_stages WHERE code = 'MAXIMIZE'), 'INVESTING', 'Investing', 'Invest wisely for your future', 'ACTIVE', 1, 1),
((SELECT id FROM system_stages WHERE code = 'PROTECT'), 'INSURANCE', 'Insurance', 'Protect yourself and your loved ones', 'ACTIVE', 1, 1),
((SELECT id FROM system_stages WHERE code = 'PROTECT'), 'ASSET_PROTECTION', 'Asset protection', 'Protect your assets', 'ACTIVE', 1, 1),
((SELECT id FROM system_stages WHERE code = 'PROTECT'), 'ESTATE_PLANNING', 'Estate planning', 'Plan for the future', 'ACTIVE', 1, 1)
ON CONFLICT (code) DO NOTHING;