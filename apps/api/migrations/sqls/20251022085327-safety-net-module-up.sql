    -- =========================================================
-- SAFETY NET GOALS TABLE
-- =========================================================
CREATE TABLE safety_net_goals (
    id BIGSERIAL PRIMARY KEY,
    goal_type VARCHAR(40) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status status_enum NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_safety_net_goals_updated_on
    BEFORE UPDATE ON safety_net_goals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();

------------------------------------------------------------------------------------------------------------------

-- =========================================================
-- USER SAFETY NET GOALS TABLE
-- =========================================================
CREATE TABLE user_safety_net_goals (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    safety_net_goal_id BIGINT NOT NULL REFERENCES safety_net_goals(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    goal_type VARCHAR(40) NOT NULL,
    target_amount BIGINT NOT NULL,
    income_contribution_amount BIGINT NOT NULL,
    current_balance BIGINT NOT NULL DEFAULT 0,
    currency_code VARCHAR(10) NOT NULL,
    achieved_on TIMESTAMP,
    expected_completion_date TIMESTAMP,
    status VARCHAR(40) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_safety_net_goals_updated_on
    BEFORE UPDATE ON user_safety_net_goals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();

------------------------------------------------------------------------------------------------------------------

-- =========================================================
-- USER SAFETY NET LEDGER TABLE
-- =========================================================
CREATE TABLE user_safety_net_ledger (
    id BIGSERIAL PRIMARY KEY,
    user_safety_net_goal_id BIGINT NOT NULL REFERENCES user_safety_net_goals(id) ON UPDATE CASCADE ON DELETE CASCADE,
    transaction_type VARCHAR(40) NOT NULL,
    amount BIGINT NOT NULL,
    currency_code VARCHAR(10) NOT NULL,
    transaction_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    balance_after BIGINT NOT NULL,
    source_type VARCHAR(40) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);


CREATE TRIGGER update_user_safety_net_ledger_updated_on
    BEFORE UPDATE ON user_safety_net_ledger
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();

-- =========================
-- Permissions
-- =========================
INSERT INTO permissions (name, description, status)
VALUES 
  -- Safety Net Management Permissions
  ('SAFETY_NET_MANAGEMENT', 'Manage safety net goals with create, update and delete operations', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

-- =========================
-- Assign Permissions to Roles
-- =========================
INSERT INTO role_permissions (role_id, permission_id)
VALUES
    (
        (SELECT id FROM roles WHERE type = 'OBIE_USER'),
        (SELECT id FROM permissions WHERE name = 'SAFETY_NET_MANAGEMENT')
    );


-- =========================
-- Seed Data
-- =========================
INSERT INTO safety_net_goals (
    goal_type,
    name,
    description,
    status,
    created_by,
    updated_by
) VALUES 
('EMERGENCY_FUND',
 'Emergency Fund',
 'A reserve to cover unexpected expenses such as medical emergencies, car repairs, or urgent home maintenance.',
 'ACTIVE',
 1,
 1),
('LUMPY_EXPENSE',
 'Lumpy Expenses',
 'Savings earmarked for planned large purchases or life events such as weddings, vacations, or home renovations.',
 'ACTIVE',
 1,
 1),
('THREE_MONTH_COVERAGE',
 '3 Months Expenses',
 'A safety buffer to cover essential living expenses for at least three months in case of income disruption.',
 'ACTIVE',
 1,
 1);
