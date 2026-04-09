-- =========================================================
-- TABLE: subscription_plans
-- =========================================================
CREATE TABLE subscription_plans (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL,
    amount INT NOT NULL,
    vat_percent FLOAT NOT NULL,
    vat_inclusive BOOLEAN NOT NULL,
    currency_code VARCHAR(10) NOT NULL,
    billing_frequency VARCHAR(40) NOT NULL,
    grace_period_days INT NOT NULL,
    display_meta_data JSON NOT NULL,
    status status_enum NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_subscription_plans_updated_on BEFORE
UPDATE ON subscription_plans
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-- =========================================================
-- TABLE: user_subscriptions
-- =========================================================
CREATE TABLE user_subscriptions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    subscription_plan_id BIGINT NOT NULL REFERENCES subscription_plans(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    start_date TIMESTAMP NOT NULL,
    validity_end_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    attempt_failure_count INT NOT NULL DEFAULT 0,
    last_attempt_timestamp TIMESTAMP,
    status VARCHAR(40) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_subscriptions_updated_on BEFORE
UPDATE ON user_subscriptions
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();


-- =========================================================
-- SEQUENCE: Invoice Number Sequence
-- =========================================================
CREATE SEQUENCE IF NOT EXISTS invoice_number_seq START 1;

-- =========================================================
-- TABLE: user_subscription_invoices
-- =========================================================
CREATE TABLE IF NOT EXISTS user_subscription_invoices (
    id BIGSERIAL PRIMARY KEY,
    invoice_number VARCHAR(6) UNIQUE NOT NULL DEFAULT LPAD(NEXTVAL('invoice_number_seq')::TEXT, 6, '0'),
    user_subscription_id BIGINT NOT NULL REFERENCES user_subscriptions(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    invoice_url TEXT,
    total_exc_vat BIGINT NOT NULL,
    vat_percent FLOAT NOT NULL,
    vat_amount BIGINT NOT NULL,
    total_amount BIGINT NOT NULL,
    currency_code VARCHAR(10) NOT NULL,
    display_metadata JSON NOT NULL,
    due_on TIMESTAMP NOT NULL,
    paid_on TIMESTAMP,
    status VARCHAR(40) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_by BIGINT NOT NULL
);

-- Add auto-update trigger for updated_on
CREATE TRIGGER update_user_subscription_invoices_updated_on
BEFORE UPDATE ON user_subscription_invoices
FOR EACH ROW
EXECUTE PROCEDURE update_updated_on_column();

-- =========================================================
-- TABLE: user_subscription_configurations
-- =========================================================
CREATE TABLE user_subscription_configurations (
    id BIGSERIAL PRIMARY KEY,
    user_subscription_id BIGINT NOT NULL REFERENCES user_subscriptions(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    amount INT,
    vat_percent FLOAT,
    vat_inclusive BOOLEAN,
    currency_code VARCHAR(10),
    display_meta_data JSON,
    status VARCHAR(40) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_subscription_configurations_updated_on BEFORE
UPDATE ON user_subscription_configurations
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-- =========================================================
-- TABLE: user_subscription_payments
-- =========================================================
CREATE TABLE user_subscription_payments (
    id BIGSERIAL PRIMARY KEY,
    user_subscription_invoice_id BIGINT NOT NULL REFERENCES user_subscription_invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    payment_date TIMESTAMP NOT NULL,
    validity_end_date TIMESTAMP NOT NULL,
    transaction_id VARCHAR(255) NOT NULL,
    transaction_mode VARCHAR(50) NOT NULL,
    transaction_amount_cents INT NOT NULL,
    payment_rows JSON NOT NULL,
    transaction_currency_code VARCHAR(10) NOT NULL,
    invoice_url VARCHAR(255) NOT NULL,
    notes TEXT,
    status VARCHAR(40) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by BIGINT NOT NULL
);

-- =========================================================
-- TABLE: user_subscription_logs
-- =========================================================
CREATE TABLE user_subscription_logs (
    id BIGSERIAL PRIMARY KEY,
    user_subscription_id BIGINT NOT NULL REFERENCES user_subscriptions(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    type VARCHAR(100) NOT NULL, -- e.g., 'SUBSCRIPTION', 'SUBSCRIPTION_PAYMENT'
    source VARCHAR(100) NOT NULL, -- e.g., 'MANUAL', 'CRON'
    log TEXT NOT NULL,
    status VARCHAR(40) NOT NULL, -- e.g., if type SUBSCRIPTION -> PURCHASED, EXPIRED, CANCELLED, RENEWED else if type SUBSCRIPTION_PAYMENT : SUCCESS, FAILURE
    created_on TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_user_subscription_logs_updated_on BEFORE
UPDATE ON user_subscription_logs
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-- =========================================================
-- TABLE: user_third_party_accounts
-- =========================================================
CREATE TABLE user_third_party_accounts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    account_type VARCHAR(100) NOT NULL, -- e.g., 'PAYMENT_GATEWAY', 'ANALYTICS_SERVICE'
    account_identifier VARCHAR(255) NOT NULL, 
    integration_identifier VARCHAR(255) NOT NULL,-- e.g., STRIPE
    status status_enum NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_third_party_accounts_updated_on BEFORE
UPDATE ON user_third_party_accounts
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-- =========================================================
-- TABLE: user_subscriptions_cards
-- =========================================================
CREATE TABLE user_subscriptions_cards (
    id BIGSERIAL PRIMARY KEY,
    user_subscription_id BIGINT NOT NULL REFERENCES user_subscriptions(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    user_account_id BIGINT NOT NULL REFERENCES user_third_party_accounts(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    card_id VARCHAR(255) NOT NULL,
    status VARCHAR(10) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_subscriptions_cards_updated_on BEFORE
UPDATE ON user_subscriptions_cards
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-- =========================================================
-- TABLE: system_default_configurations
-- =========================================================
CREATE TABLE system_default_configurations (
    id BIGSERIAL PRIMARY KEY,
    subscription_trial_days INT NOT NULL,
    payment_retry_count INT NOT NULL,
    payment_retry_period_hours INT NOT NULL,
    status status_enum NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_system_default_configurations_updated_on BEFORE
UPDATE ON system_default_configurations
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-- =========================================================
-- TABLE: user_trial_periods
-- =========================================================
CREATE TABLE user_trial_periods (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    status VARCHAR(40) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_trial_periods_updated_on BEFORE
UPDATE ON user_trial_periods
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-- =========================================================
-- Permissions & Seed Data
-- =========================================================
INSERT INTO permissions (name, description, status)
VALUES 
  ('SUBSCRIPTION_MANAGEMENT', 'Manage user subscriptions with create and update operations', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
VALUES
  (
    (SELECT id FROM roles WHERE type = 'OBIE_USER'),
    (SELECT id FROM permissions WHERE name = 'SUBSCRIPTION_MANAGEMENT')
  )
ON CONFLICT DO NOTHING;

INSERT INTO system_default_configurations 
(subscription_trial_days, payment_retry_count, payment_retry_period_hours, status, created_by, updated_by)
VALUES
(60, 3, 24, 'ACTIVE', 1, 1)
ON CONFLICT DO NOTHING;

INSERT INTO subscription_plans 
(code, name, amount, vat_percent, vat_inclusive, currency_code, billing_frequency, grace_period_days, display_meta_data, status, created_by, updated_by)
VALUES
('BASIC_PLAN', 'Basic Subscription Plan', 995, 10.0, TRUE, 'AUD', 'MONTHLY', 15, 
 '{"features": ["Unlimited access", "Priority support", "Monthly billing"]}', 
 'ACTIVE', 1, 1)
ON CONFLICT (code) DO NOTHING;