-- =========================================================
-- TABLE: user_debts
-- =========================================================
CREATE TABLE user_debts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name VARCHAR NOT NULL,
    original_amount BIGINT NOT NULL,
    remaining_amount BIGINT NOT NULL,
    installment_amount BIGINT NOT NULL,
    currency_code VARCHAR NOT NULL,
    interest_rate DOUBLE PRECISION NOT NULL,
    payment_frequency VARCHAR NOT NULL,
    installment_due_day INT NOT NULL,
    next_installment_due_date TIMESTAMP NOT NULL,
    estimated_payoff_date TIMESTAMP NOT NULL,
    accelerated_payoff_date TIMESTAMP,
    paid_off_on TIMESTAMP,
    status VARCHAR(40) NOT NULL DEFAULT 'IN_PROGRESS',
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_debts_updated_on
    BEFORE UPDATE ON user_debts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();

-- =========================================================
-- TABLE: user_debt_payments
-- =========================================================
CREATE TABLE user_debt_payments (
    id BIGSERIAL PRIMARY KEY,
    user_debt_id BIGINT NOT NULL REFERENCES user_debts(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    transaction_type VARCHAR(40) NOT NULL, -- INSTALLMENT, EXTRA_CONTRIBUTION,
    installment_date TIMESTAMP NOT NULL,
    paid_amount BIGINT NOT NULL,
    installment_amount BIGINT NOT NULL,
    extra_contribution_amount BIGINT,
    currency_code VARCHAR NOT NULL,
    paid_on TIMESTAMP NOT NULL,
    payment_method VARCHAR,
    payment_note TEXT,
    status VARCHAR(40) NOT NULL DEFAULT 'PAID',
    source_type VARCHAR(40) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_debt_payments_updated_on
    BEFORE UPDATE ON user_debt_payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();

-- =========================================================
-- TABLE: user_debt_accelerator
-- =========================================================
CREATE TABLE user_debt_accelerator (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    accelerated_debt_id BIGINT NOT NULL REFERENCES user_debts(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    payoff_strategy VARCHAR(40) NOT NULL,
    estimated_saved_amount BIGINT NOT NULL,
    accelerator_allocated_amount BIGINT NOT NULL,
    currency_code VARCHAR NOT NULL,
    original_payoff_date TIMESTAMP NOT NULL,
    accelerator_start_date TIMESTAMP NOT NULL,
    accelerated_payoff_date TIMESTAMP NOT NULL,
    accelerator_end_date TIMESTAMP,
    saved_amount BIGINT,
    status VARCHAR(40) NOT NULL DEFAULT 'ACTIVE',
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_debt_accelerator_updated_on
    BEFORE UPDATE ON user_debt_accelerator
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_on_column();


-- =========================
-- Permissions
-- =========================
INSERT INTO permissions (name, description, status)
VALUES 
  -- Safety Net Management Permissions
  ('DEBT_MANAGEMENT', 'Manage debt with create, update and delete operations', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

-- =========================
-- Assign Permissions to Roles
-- =========================
INSERT INTO role_permissions (role_id, permission_id)
VALUES
    (
        (SELECT id FROM roles WHERE type = 'OBIE_USER'),
        (SELECT id FROM permissions WHERE name = 'DEBT_MANAGEMENT')
    );

