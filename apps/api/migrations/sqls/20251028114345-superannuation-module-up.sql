-- =========================================================
-- TABLE: user_retirement_profiles
-- =========================================================
CREATE TABLE user_retirement_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    retirement_age INT NOT NULL,
    target_annual_retirement_income BIGINT NOT NULL,
    currency_code VARCHAR NOT NULL,
    status VARCHAR(40) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_retirement_profiles_updated_on
    BEFORE UPDATE ON user_retirement_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();


-- =========================================================
-- TABLE: user_super_funds
-- =========================================================
CREATE TABLE user_super_funds (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name VARCHAR NOT NULL,
    fund_identifier VARCHAR UNIQUE,
    account_open_date TIMESTAMP,
    current_balance BIGINT NOT NULL,
    contribution_amount BIGINT NOT NULL,
    contribution_frequency VARCHAR(40) NOT NULL,
    currency_code VARCHAR NOT NULL,
    contribution_type VARCHAR NOT NULL,
    status VARCHAR(40) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_super_funds_updated_on
    BEFORE UPDATE ON user_super_funds
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();
-- =========================================================
-- TABLE: system_super_health_check_templates
-- =========================================================
CREATE TABLE system_super_health_check_templates (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    code VARCHAR NOT NULL UNIQUE,
    description TEXT,
    status status_enum NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_system_super_health_check_templates_updated_on
    BEFORE UPDATE ON system_super_health_check_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();
-- =========================================================
-- TABLE: system_super_health_checkpoints
-- =========================================================
CREATE TABLE system_super_health_checkpoints (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR NOT NULL UNIQUE,
    system_super_health_check_template_id BIGINT NOT NULL 
        REFERENCES system_super_health_check_templates(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    sequence_number INT NOT NULL,
    presentation_meta_data JSON NOT NULL,
    configuration_meta_data JSON,
    status status_enum NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_system_super_health_checkpoints_updated_on
    BEFORE UPDATE ON system_super_health_checkpoints
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();
-- =========================================================
-- TABLE: user_super_health_check_templates
-- =========================================================
CREATE TABLE user_super_health_check_templates (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    description TEXT,
    started_on TIMESTAMP,
    completed_on TIMESTAMP,
    status VARCHAR(40) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_super_health_check_templates_updated_on
    BEFORE UPDATE ON user_super_health_check_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();
-- =========================================================
-- TABLE: user_super_health_checkpoints
-- =========================================================
CREATE TABLE user_super_health_checkpoints (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR NOT NULL,
    user_super_health_check_template_id BIGINT NOT NULL 
        REFERENCES user_super_health_check_templates(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    sequence_number INT NOT NULL,
    presentation_meta_data JSON NOT NULL,
    configuration_meta_data JSON,
    completed_on TIMESTAMP,
    status VARCHAR(40) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_super_health_checkpoints_updated_on
    BEFORE UPDATE ON user_super_health_checkpoints
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();


-- =========================
-- Permissions
-- =========================
INSERT INTO permissions (name, description, status)
VALUES 
  -- Safety Net Management Permissions
  ('SUPER_ANNUATION_MANAGEMENT', 'Manage superannuation with create and update operations', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

-- =========================
-- Assign Permissions to Roles
-- =========================
INSERT INTO role_permissions (role_id, permission_id)
VALUES
    (
        (SELECT id FROM roles WHERE type = 'OBIE_USER'),
        (SELECT id FROM permissions WHERE name = 'SUPER_ANNUATION_MANAGEMENT')
    );


-- =========================================================
-- SEED DATA FOR system_super_health_check_templates AND system_super_health_checkpoints
-- =========================================================
INSERT INTO system_super_health_check_templates (code, name, description, status, created_by, updated_by) VALUES
('SUPER_HEALTH_CHECK', 'Super health check', 'Health check', 'ACTIVE', 1, 1)
ON CONFLICT (code) DO NOTHING;
-- 1️⃣ Insert template (if not already present)
INSERT INTO system_super_health_check_templates (code, name, description, status, created_by, updated_by)
VALUES ('SUPER_HEALTH_CHECK', 'Super health check', 'Health check', 'ACTIVE', 1, 1)
ON CONFLICT (code) DO NOTHING;

WITH template AS (
    SELECT id FROM system_super_health_check_templates WHERE code = 'SUPER_HEALTH_CHECK'
)

INSERT INTO system_super_health_checkpoints 
(code, system_super_health_check_template_id, sequence_number, presentation_meta_data, configuration_meta_data, status, created_by, updated_by)
VALUES
-- 1️⃣ Review of holdings across multiple super funds
('CHECKPOINT_1', (SELECT id FROM template), 1, 
 '{"title": "Review of Holdings across Multiple Super Funds", "description": ""}', 
 '{}', 
 'ACTIVE', 1, 1),

-- 2️⃣ Fee Structures of Super Funds (KEEP description)
('CHECKPOINT_2', (SELECT id FROM template), 2, 
 '{"title": "Fee Structures of Super Funds", "description": "Review and compare your fee structure"}', 
 '{}', 
 'ACTIVE', 1, 1),

-- 3️⃣ Effective Returns of Super Funds
('CHECKPOINT_3', (SELECT id FROM template), 3, 
 '{"title": "Effective Returns of Super Funds", "description": ""}', 
 '{}', 
 'ACTIVE', 1, 1),

-- 4️⃣ Lost Super
('CHECKPOINT_4', (SELECT id FROM template), 4, 
 '{"title": "Lost Super", "description": ""}', 
 '{}', 
 'ACTIVE', 1, 1),

-- 5️⃣ Binding Nominations
('CHECKPOINT_5', (SELECT id FROM template), 5, 
 '{"title": "Binding Nominations Signed", "description": ""}', 
 '{}', 
 'ACTIVE', 1, 1),

-- 6️⃣ Level of Insurances covered by superannuation
('CHECKPOINT_6', (SELECT id FROM template), 6, 
 '{"title": "Level of Insurances covered by superannuation", "description": ""}', 
 '{}', 
 'ACTIVE', 1, 1)
ON CONFLICT (code) DO NOTHING;
