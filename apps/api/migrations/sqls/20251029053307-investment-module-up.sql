CREATE TABLE investment_types (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL UNIQUE,
    status status_enum NOT NULL,  -- ENUM handled via VARCHAR for flexibility
    created_on TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_by BIGINT NOT NULL
);

-- ===========================================================
--  Create Table: user_investments
-- ===========================================================
CREATE TABLE user_investments (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    investment_type_id BIGINT NOT NULL REFERENCES investment_types(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    custom_investment_type VARCHAR(255),
    target_amount BIGINT NOT NULL,
    current_balance BIGINT NOT NULL,
    income_contribution_amount BIGINT NOT NULL,
    contribution_frequency VARCHAR(50) NOT NULL, 
    currency_code VARCHAR(10) NOT NULL,
    expected_annual_return_percent DOUBLE PRECISION,
    start_date TIMESTAMP,
    achieved_on TIMESTAMP,
    expected_completion_date TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_by BIGINT NOT NULL
);

-- ===========================================================
--  Create Table: user_investment_ledger
-- ===========================================================
CREATE TABLE user_investment_ledger (
    id BIGSERIAL PRIMARY KEY,
    user_investment_id BIGINT NOT NULL REFERENCES user_investments(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    transaction_type VARCHAR(50) NOT NULL,
    amount BIGINT NOT NULL,
    currency_code VARCHAR(10) NOT NULL,
    transaction_date TIMESTAMP NOT NULL,
    balance_after BIGINT NOT NULL,
    source_type VARCHAR(50) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_by BIGINT NOT NULL
);

-- =========================
-- Permissions
-- =========================
INSERT INTO permissions (name, description, status)
VALUES 
  ('INVESTMENT_MANAGEMENT', 'Manage user investments with create, update and delete operations', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

-- =========================
-- Assign Permissions to Roles
-- =========================
INSERT INTO role_permissions (role_id, permission_id)
VALUES
    (
        (SELECT id FROM roles WHERE type = 'OBIE_USER'),
        (SELECT id FROM permissions WHERE name = 'INVESTMENT_MANAGEMENT')
    );



-- =========================================================
-- SEED DATA FOR investment_types
-- =========================================================
INSERT INTO investment_types (code, name, status, created_by, updated_by) VALUES
('SALARY_SACRIFICE_SUPER', 'Salary sacrifice into super', 'ACTIVE', 1, 1),
('SET_AND_FORGET_EFT', 'Set and forget EFT', 'ACTIVE', 1, 1),
('INVESTMENT_SHARE_MARKET', 'Investment in share market', 'ACTIVE', 1, 1),
('PAY_MORTGAGE_EARLY', 'Pay mortgage down early', 'ACTIVE', 1, 1),
('INVEST_IN_CRYPTO', 'Invest in crypto', 'ACTIVE', 1, 1),
('BUY_INVESTMENT_PROPERTY', 'Buying investment property', 'ACTIVE', 1, 1),
('MANAGED_FUND', 'Managed Fund', 'ACTIVE', 1, 1),
('ROUND_UPS', 'Round Ups', 'ACTIVE', 1, 1),
('OTHER', 'Other', 'ACTIVE', 1, 1)
ON CONFLICT (code) DO NOTHING;

