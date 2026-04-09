
CREATE TABLE user_expenses (
    id BIGSERIAL PRIMARY KEY,
    user_budget_plan_allocation_id BIGINT NOT NULL REFERENCES user_budget_plan_allocation(id) ON UPDATE CASCADE ON DELETE CASCADE,
    name VARCHAR NOT NULL,
    amount BIGINT NOT NULL,
    currency_code VARCHAR NOT NULL,
    status status_enum NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_expenses_updated_on 
    BEFORE UPDATE ON user_expenses 
    FOR EACH ROW EXECUTE FUNCTION update_updated_on_column();


-- =========================================================
-- Permissions
-- =========================================================
INSERT INTO permissions (name, description, status)
VALUES 
  ('USER_EXPENSES_MANAGEMENT', 'Manage users to see user expenses insights to modules', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
VALUES
    (
        (SELECT id FROM roles WHERE type = 'OBIE_USER'),
        (SELECT id FROM permissions WHERE name = 'USER_EXPENSES_MANAGEMENT')
    );

