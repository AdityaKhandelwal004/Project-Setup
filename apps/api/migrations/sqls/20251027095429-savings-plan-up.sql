-- =========================================================
-- TABLE: user_savings_goals
-- =========================================================
CREATE TABLE user_savings_goals (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    goal_name VARCHAR NOT NULL,
    image_url TEXT,
    target_amount BIGINT NOT NULL,
    target_date TIMESTAMP,
    income_contribution_amount BIGINT,
    current_balance BIGINT NOT NULL,
    currency_code VARCHAR NOT NULL,
    achieved_on TIMESTAMP,
    expected_completion_date TIMESTAMP,
    status VARCHAR(40) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);


CREATE TRIGGER update_user_savings_goals_updated_on
    BEFORE UPDATE ON user_savings_goals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();


-- =========================================================
-- TABLE: user_savings_goal_ledger
-- =========================================================
CREATE TABLE user_savings_goal_ledger (
    id BIGSERIAL PRIMARY KEY,
    user_savings_goal_id BIGINT NOT NULL REFERENCES user_savings_goals(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    transaction_type VARCHAR NOT NULL, -- e.g., 'DEPOSIT', 'WITHDRAWAL', 'ADJUSTMENT'
    amount BIGINT NOT NULL,
    currency_code VARCHAR NOT NULL,
    transaction_date TIMESTAMP NOT NULL,
    balance_after BIGINT NOT NULL,
    source_type VARCHAR(40) NOT NULL, -- e.g., 'INCOME', 'SAVING', etc.
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_savings_goal_ledger_updated_on
    BEFORE UPDATE ON user_savings_goal_ledger
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();

-- =========================
-- Permissions
-- =========================
INSERT INTO permissions (name, description, status)
VALUES 
  -- Safety Net Management Permissions
  ('SAVINGS_PLAN_MANAGEMENT', 'Manage savings plans with create and update operations', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

-- =========================
-- Assign Permissions to Roles
-- =========================
INSERT INTO role_permissions (role_id, permission_id)
VALUES
    (
        (SELECT id FROM roles WHERE type = 'OBIE_USER'),
        (SELECT id FROM permissions WHERE name = 'SAVINGS_PLAN_MANAGEMENT')
    );