-- Drop user-related tables (lowest level dependencies first)
DROP TABLE IF EXISTS user_budget_plan_expenses CASCADE;
DROP TABLE IF EXISTS user_budget_plan_allocation CASCADE;
DROP TABLE IF EXISTS user_budget_plan CASCADE;
DROP TABLE IF EXISTS user_saving_ledger CASCADE;
DROP TABLE IF EXISTS user_saving CASCADE;
DROP TABLE IF EXISTS user_income CASCADE;

-- Drop system-level budget tables (higher-level dependencies next)
DROP TABLE IF EXISTS system_budget_plan_allocation CASCADE;
DROP TABLE IF EXISTS system_budget_categories CASCADE;
DROP TABLE IF EXISTS system_budget_plan CASCADE;

-- Drop ENUM types (only after dependent tables are gone)
DROP TYPE IF EXISTS allocation_type;
DROP TYPE IF EXISTS saving_ledger_status;
DROP TYPE IF EXISTS saving_ledger_type;
DROP TYPE IF EXISTS income_type;
DROP TYPE IF EXISTS income_frequency;

-- Down Migration: Drop Enums

DROP TYPE IF EXISTS allocation_type CASCADE;
DROP TYPE IF EXISTS saving_ledger_status CASCADE;
DROP TYPE IF EXISTS saving_ledger_type CASCADE;
DROP TYPE IF EXISTS income_source_type CASCADE;
DROP TYPE IF EXISTS income_type CASCADE;
DROP TYPE IF EXISTS frequency_type CASCADE;
