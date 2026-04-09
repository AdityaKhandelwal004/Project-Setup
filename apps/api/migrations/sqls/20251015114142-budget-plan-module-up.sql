CREATE TYPE income_type AS ENUM ('PRIMARY', 'SECONDARY');
CREATE TYPE saving_ledger_status AS ENUM ('SUCCESS', 'FAILURE');
CREATE TYPE allocation_type AS ENUM ('SAVING', 'EXPENSE');

-- =========================================================
-- SYSTEM BUDGET PLAN & CATEGORIES
-- =========================================================
CREATE TABLE system_budget_plan (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR NOT NULL UNIQUE,
    expense_percentage NUMERIC NOT NULL,
    savings_percentage NUMERIC NOT NULL,
    status status_enum NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_system_budget_plan_updated_on 
    BEFORE UPDATE ON system_budget_plan 
    FOR EACH ROW EXECUTE FUNCTION update_updated_on_column();

-----------------------------------------------------------------------------


CREATE TABLE system_budget_categories (
    id BIGSERIAL PRIMARY KEY,
    parent_id BIGINT REFERENCES system_budget_categories(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    code VARCHAR NOT NULL UNIQUE,
    name VARCHAR NOT NULL UNIQUE,
    icon TEXT,
    description TEXT,
    expense_options JSONB,
    status status_enum NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_system_budget_categories_updated_on 
    BEFORE UPDATE ON system_budget_categories 
    FOR EACH ROW EXECUTE FUNCTION update_updated_on_column();

-----------------------------------------------------------------------------

CREATE TABLE system_budget_plan_allocation (
    id BIGSERIAL PRIMARY KEY,
    system_budget_plan_id BIGINT NOT NULL REFERENCES system_budget_plan(id) ON UPDATE CASCADE ON DELETE CASCADE,
    system_budget_category_id BIGINT NOT NULL REFERENCES system_budget_categories(id) ON UPDATE CASCADE ON DELETE CASCADE,
    allocation_type allocation_type NOT NULL,
    allocation_percentage NUMERIC NOT NULL,
    status status_enum NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_system_budget_plan_allocation_updated_on 
    BEFORE UPDATE ON system_budget_plan_allocation 
    FOR EACH ROW EXECUTE FUNCTION update_updated_on_column();

-----------------------------------------------------------------------------

-- =========================================================
-- USER BUDGET PLAN & RELATED TABLES
-- =========================================================
CREATE TABLE user_income (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    source VARCHAR(40) NOT NULL,
    amount BIGINT NOT NULL,
    currency_code VARCHAR NOT NULL,
    frequency VARCHAR(40) NOT NULL,
    scheduled_payment_date DATE NOT NULL,
    type income_type NOT NULL,
    status status_enum NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_income_updated_on 
    BEFORE UPDATE ON user_income 
    FOR EACH ROW EXECUTE FUNCTION update_updated_on_column();

------------------------------------------------------------------------------

CREATE TABLE user_saving (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    amount BIGINT NOT NULL,
    currency_code VARCHAR NOT NULL,
    status status_enum NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_saving_updated_on 
    BEFORE UPDATE ON user_saving 
    FOR EACH ROW EXECUTE FUNCTION update_updated_on_column();

------------------------------------------------------------------------------

CREATE TABLE user_saving_ledger (
    id BIGSERIAL PRIMARY KEY,
    user_saving_id BIGINT NOT NULL REFERENCES user_saving(id) ON UPDATE CASCADE ON DELETE CASCADE,
    type VARCHAR(40) NOT NULL,
    amount BIGINT NOT NULL,
    currency_code VARCHAR NOT NULL,
    transaction_date TIMESTAMP NOT NULL,
    balance_after INT NOT NULL,
    description TEXT,
    status saving_ledger_status NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_saving_ledger_updated_on 
    BEFORE UPDATE ON user_saving_ledger 
    FOR EACH ROW EXECUTE FUNCTION update_updated_on_column();

------------------------------------------------------------------------------

CREATE TABLE user_budget_plan (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    expense_amount BIGINT,
    expense_percentage NUMERIC,
    savings_amount BIGINT,
    savings_percentage NUMERIC,
    currency_code VARCHAR,
    status status_enum NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_budget_plan_updated_on 
    BEFORE UPDATE ON user_budget_plan 
    FOR EACH ROW EXECUTE FUNCTION update_updated_on_column();

------------------------------------------------------------------------------

CREATE TABLE user_budget_plan_allocation (
    id BIGSERIAL PRIMARY KEY,
    user_budget_id BIGINT NOT NULL REFERENCES user_budget_plan(id) ON UPDATE CASCADE ON DELETE CASCADE,
    system_budget_category_id BIGINT NOT NULL REFERENCES system_budget_categories(id) ON UPDATE CASCADE ON DELETE CASCADE,
    allocation_amount BIGINT,
    currency_code VARCHAR,
    frequency VARCHAR(40),
    allocation_percentage NUMERIC,
    allocation_type allocation_type NOT NULL,
    status status_enum NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_budget_plan_allocation_updated_on 
    BEFORE UPDATE ON user_budget_plan_allocation 
    FOR EACH ROW EXECUTE FUNCTION update_updated_on_column();

------------------------------------------------------------------------------

CREATE TABLE user_budget_plan_expenses (
    id BIGSERIAL PRIMARY KEY,
    user_budget_plan_allocation_id BIGINT NOT NULL REFERENCES user_budget_plan_allocation(id) ON UPDATE CASCADE ON DELETE CASCADE,
    name VARCHAR NOT NULL,
    amount BIGINT NOT NULL,
    currency_code VARCHAR NOT NULL,
    frequency VARCHAR(40) NOT NULL,
    status status_enum NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_budget_plan_expenses_updated_on 
    BEFORE UPDATE ON user_budget_plan_expenses 
    FOR EACH ROW EXECUTE FUNCTION update_updated_on_column();

------------------------------------------------------------------------------

-- =========================
-- Permissions
-- =========================
INSERT INTO permissions (name, description, status)
VALUES 
  -- Income Management Permissions
  ('INCOME_MANAGEMENT', 'Manage income sources with create, update and delete operations', 'ACTIVE'),
  ('SAVING_MANAGEMENT', 'Manage user saving with create, update and delete operations', 'ACTIVE'),
  ('BUDGET_PLAN_MANAGEMENT', 'Manage budget plans and allocations', 'ACTIVE'),
  ('BUDGET_ALLOCATION_MANAGEMENT', 'Allocate income to budget plan', 'ACTIVE'),
  ('EXPENSE_MANAGEMENT', 'Manage user expenses with create, update and delete operations', 'ACTIVE'),
  ('BUDGET_ENUM', 'Budget Plan Enum', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

-- =========================
-- Assign Permissions to Roles
-- =========================
INSERT INTO role_permissions (role_id, permission_id)
VALUES
    (
        (SELECT id FROM roles WHERE type = 'SUPER_ADMIN'),
        (SELECT id FROM permissions WHERE name = 'INCOME_MANAGEMENT')
    ),
    (
        (SELECT id FROM roles WHERE type = 'OBIE_USER'),
        (SELECT id FROM permissions WHERE name = 'INCOME_MANAGEMENT')
    ),
    (
        (SELECT id FROM roles WHERE type = 'SUPER_ADMIN'),
        (SELECT id FROM permissions WHERE name = 'SAVING_MANAGEMENT')
    ),
    (
        (SELECT id FROM roles WHERE type = 'OBIE_USER'),
        (SELECT id FROM permissions WHERE name = 'SAVING_MANAGEMENT')
    ),
    (
        (SELECT id FROM roles WHERE type = 'SUPER_ADMIN'),
        (SELECT id FROM permissions WHERE name = 'BUDGET_PLAN_MANAGEMENT')
    ),
    (
        (SELECT id FROM roles WHERE type = 'OBIE_USER'),
        (SELECT id FROM permissions WHERE name = 'BUDGET_PLAN_MANAGEMENT')
    ),
    (
        (SELECT id FROM roles WHERE type = 'SUPER_ADMIN'),
        (SELECT id FROM permissions WHERE name = 'BUDGET_ALLOCATION_MANAGEMENT')
    ),
    (
        (SELECT id FROM roles WHERE type = 'OBIE_USER'),
        (SELECT id FROM permissions WHERE name = 'BUDGET_ALLOCATION_MANAGEMENT')
    ),
    (
        (SELECT id FROM roles WHERE type = 'SUPER_ADMIN'),
        (SELECT id FROM permissions WHERE name = 'EXPENSE_MANAGEMENT')
    ),
    (
        (SELECT id FROM roles WHERE type = 'OBIE_USER'),
        (SELECT id FROM permissions WHERE name = 'EXPENSE_MANAGEMENT')
    ),
    (
        (SELECT id FROM roles WHERE type = 'OBIE_USER'),
        (SELECT id FROM permissions WHERE name = 'BUDGET_ENUM')
    );
-- =========================
-- Seed Data
-- =========================
INSERT INTO system_budget_plan (
    code,
    expense_percentage,
    savings_percentage,
    status,
    created_by,
    updated_by
) VALUES (
    '70_30',
    70,       -- expense %
    30,       -- savings %
    'ACTIVE', -- assuming 'status_enum' has ACTIVE
    1,        -- created_by (replace with actual admin/user id)
    1         -- updated_by
);

INSERT INTO system_budget_categories (
    parent_id,
    code,
    name,
    icon,
    description,
    expense_options,
    status,
    created_by,
    updated_by
) VALUES 
(NULL, 'LIVING_EXPENSES', 'Living Expenses', 'https://cdn.obiemoney.com/user-app-icons/budget-plan/living-&-expenses.png', 'Rent, utilities, groceries and transport', null, 'ACTIVE', 1, 1),
(NULL, 'MEDICAL_&_INSURANCE', 'Medical & Insurance', 'https://cdn.obiemoney.com/user-app-icons/budget-plan/medical-insurance.png', 'Health & protection', null, 'ACTIVE', 1, 1),
(NULL, 'FUN_&_ENTERTAINMENT', 'Fun & Entertainment', 'https://cdn.obiemoney.com/user-app-icons/budget-plan/fun-&-entertainment.png', 'Leisure & lifestyle', '[
  { "label": "Movies" },
  { "label": "Date Night!" },
  { "label": "Caffine Hit!" },
  { "label": "Dining Out"},
  { "label": "Coffee"},
  { "label": "Concerts" },
  { "label": "Sports & Fitness" },
  { "label": "Games" },
  { "label": "Hobbies" },
  { "label": "Travel" }
]'::jsonb, 'ACTIVE', 1, 1),
(NULL, 'DEBT_REPAYMENT', 'Debt Repayment', 'https://cdn.obiemoney.com/user-app-icons/budget-plan/debt-repayments.png', 'Loans & credit cards', '[
  { "label": "Credit Card" },
  { "label": "Personal Loan" },
  { "label": "Student Loan" },
  { "label": "Mortgage" }
]'::jsonb, 'ACTIVE', 1, 1),
(NULL, 'SAVINGS', 'Savings', 'https://cdn.obiemoney.com/user-app-icons/budget-plan/savings.png', 'Emergency funds, debt detox and savings goals', null, 'ACTIVE', 1, 1),
(NULL, 'INVESTMENT', 'Investment', 'https://cdn.obiemoney.com/user-app-icons/budget-plan/investment.png', 'Wealth building, inside and outside of super', null, 'ACTIVE', 1, 1);

-- Example child category for Housing (you can add more later)
INSERT INTO system_budget_categories (
    parent_id,
    code,
    name,
    icon,
    description,
    expense_options,
    status,
    created_by,
    updated_by
) VALUES 
-- ===========================
-- LIVING EXPENSES → HOUSING
-- ===========================
(
    (SELECT id FROM system_budget_categories WHERE code='LIVING_EXPENSES'),
    'HOUSING',
    'Housing',
    null,
    null,
    '[
      { "label": "Mortgage" },
      { "label": "Rent" },
      { "label": "Board" },
      { "label": "Accom" },
      { "label": "Airbnb" }
    ]'::jsonb,
    'ACTIVE',
    1,
    1
),
-- ===========================
-- LIVING EXPENSES → TRANSPORT
-- ===========================
(
    (SELECT id FROM system_budget_categories WHERE code='LIVING_EXPENSES'),
    'TRANSPORT',
    'Transport',
    null,
    null,
    '[
      { "label": "Fuel" },
      { "label": "Registration" },
      { "label": "Service" },
      { "label": "Repairs" },
      { "label": "Carwash" },
      { "label": "Valet" },
      { "label": "Public Transport" },
      { "label": "Tolls" },
      { "label": "Carparking" },
      { "label": "Ferry Tickets" },
      { "label": "Ride Share" },
      { "label": "Taxis" }
    ]'::jsonb,
    'ACTIVE',
    1,
    1
),
-- ===========================
-- LIVING EXPENSES → GROCERIES / FOOD
-- ===========================
(
    (SELECT id FROM system_budget_categories WHERE code='LIVING_EXPENSES'),
    'GROCERIES_/_FOOD',
    'Groceries / Food',
    null,
    null,
    '[
      { "label": "Aldi" },
      { "label": "Coles" },
      { "label": "Woolworths" },
      { "label": "IGA" },
      { "label": "Farmers Market" },
      { "label": "Coffee with friends" },
      { "label": "Drinks with mates" },
      { "label": "Dinners Out" },
      { "label": "Takeaways" }
    ]'::jsonb,
    'ACTIVE',
    1,
    1
),
-- ===========================
-- LIVING EXPENSES → ESSENTIAL BILLS
-- ===========================
(
    (SELECT id FROM system_budget_categories WHERE code='LIVING_EXPENSES'),
    'ESSENTIAL_BILLS',
    'Essential Bills',
    null,
    null,
    '[
      { "label": "Gym" },
      { "label": "Electricity" },
      { "label": "Gas" },
      { "label": "Water" },
      { "label": "Rates" },
      { "label": "School Fees" }
    ]'::jsonb,
    'ACTIVE',
    1,
    1
),
-- ===========================
-- MEDICAL & INSURANCE → MEDICAL
-- ===========================
(
    (SELECT id FROM system_budget_categories WHERE code='MEDICAL_&_INSURANCE'),
    'MEDICAL',
    'Medical',
    null,
    null,
    '[
      { "label": "Doctors Visits" }
    ]'::jsonb,
    'ACTIVE',
    1,
    1
),
-- ===========================
-- MEDICAL & INSURANCE → INSURANCES
-- ===========================
(
    (SELECT id FROM system_budget_categories WHERE code='MEDICAL_&_INSURANCE'),
    'INSURANCES',
    'Insurances',
    null,
    null,
    '[
      { "label": "Medical Insurance" },
      { "label": "Car Insurance" },
      { "label": "Home and Contents Insurance" }
    ]'::jsonb,
    'ACTIVE',
    1,
    1
);


-- =========================
-- Seed system_budget_plan_allocation
-- =========================
-- Allocate top-level plan to parent categories
INSERT INTO system_budget_plan_allocation (
    system_budget_plan_id,
    system_budget_category_id,
    allocation_type,
    allocation_percentage,
    status,
    created_by,
    updated_by
) VALUES
(
    (SELECT id FROM system_budget_plan WHERE code='70_30'),
    (SELECT id FROM system_budget_categories WHERE code='LIVING_EXPENSES'),
    'EXPENSE',
    55,  -- example allocation %
    'ACTIVE',
    1,
    1
),
(
    (SELECT id FROM system_budget_plan WHERE code='70_30'),
    (SELECT id FROM system_budget_categories WHERE code='MEDICAL_&_INSURANCE'),
    'EXPENSE',
    5,
    'ACTIVE',
    1,
    1
),
(
    (SELECT id FROM system_budget_plan WHERE code='70_30'),
    (SELECT id FROM system_budget_categories WHERE code='FUN_&_ENTERTAINMENT'),
    'EXPENSE',
    10,
    'ACTIVE',
    1,
    1
),
(
    (SELECT id FROM system_budget_plan WHERE code='70_30'),
    (SELECT id FROM system_budget_categories WHERE code='DEBT_REPAYMENT'),
    'EXPENSE',
    0,
    'ACTIVE',
    1,
    1
),
(
    (SELECT id FROM system_budget_plan WHERE code='70_30'),
    (SELECT id FROM system_budget_categories WHERE code='SAVINGS'),
    'SAVING',
    20,
    'ACTIVE',
    1,
    1
),
(
    (SELECT id FROM system_budget_plan WHERE code='70_30'),
    (SELECT id FROM system_budget_categories WHERE code='INVESTMENT'),
    'SAVING',
    10,
    'ACTIVE',
    1,
    1
);

-- Allocate to child categories (example percentages under parent)
INSERT INTO system_budget_plan_allocation (
    system_budget_plan_id,
    system_budget_category_id,
    allocation_type,
    allocation_percentage,
    status,
    created_by,
    updated_by
) VALUES
(
    (SELECT id FROM system_budget_plan WHERE code='70_30'),
    (SELECT id FROM system_budget_categories WHERE code='HOUSING'),
    'EXPENSE',
    30,  -- portion of LIVING_EXPENSES
    'ACTIVE',
    1,
    1
),
(
    (SELECT id FROM system_budget_plan WHERE code='70_30'),
    (SELECT id FROM system_budget_categories WHERE code='TRANSPORT'),
    'EXPENSE',
    5,
    'ACTIVE',
    1,
    1
),
(
    (SELECT id FROM system_budget_plan WHERE code='70_30'),
    (SELECT id FROM system_budget_categories WHERE code='GROCERIES_/_FOOD'),
    'EXPENSE',
    10,
    'ACTIVE',
    1,
    1
),
(
    (SELECT id FROM system_budget_plan WHERE code='70_30'),
    (SELECT id FROM system_budget_categories WHERE code='ESSENTIAL_BILLS'),
    'EXPENSE',
    10,
    'ACTIVE',
    1,
    1
),
(
    (SELECT id FROM system_budget_plan WHERE code='70_30'),
    (SELECT id FROM system_budget_categories WHERE code='MEDICAL'),
    'EXPENSE',
    2,  -- portion of MEDICAL_&_INSURANCE
    'ACTIVE',
    1,
    1
),
(
    (SELECT id FROM system_budget_plan WHERE code='70_30'),
    (SELECT id FROM system_budget_categories WHERE code='INSURANCES'),
    'EXPENSE',
    3,
    'ACTIVE',
    1,
    1
);
