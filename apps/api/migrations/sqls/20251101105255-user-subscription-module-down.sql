DROP TABLE IF EXISTS user_trial_periods CASCADE;
DROP TABLE IF EXISTS system_default_configurations CASCADE;
DROP TABLE IF EXISTS user_third_party_accounts CASCADE;
DROP TABLE IF EXISTS user_subscription_logs CASCADE;
DROP TABLE IF EXISTS user_subscription_payments CASCADE;
DROP TABLE IF EXISTS user_subscription_configurations CASCADE;
DROP TABLE IF EXISTS user_subscription_invoices CASCADE;
DROP TABLE IF EXISTS user_subscriptions CASCADE;
DROP TABLE IF EXISTS subscription_plans CASCADE;

-- Drop the invoice number sequence
DROP SEQUENCE IF EXISTS invoice_number_seq CASCADE;

DROP TRIGGER IF EXISTS update_user_trial_periods_updated_on ON user_trial_periods;
DROP TRIGGER IF EXISTS update_system_default_configurations_updated_on ON system_default_configurations;
DROP TRIGGER IF EXISTS update_user_third_party_accounts_updated_on ON user_third_party_accounts;
DROP TRIGGER IF EXISTS update_user_subscription_logs_updated_on ON user_subscription_logs;
DROP TRIGGER IF EXISTS update_user_subscription_payments_updated_on ON user_subscription_payments;
DROP TRIGGER IF EXISTS update_user_subscription_configurations_updated_on ON user_subscription_configurations;
DROP TRIGGER IF EXISTS update_user_subscription_invoices_updated_on ON user_subscription_invoices;
DROP TRIGGER IF EXISTS update_user_subscriptions_updated_on ON user_subscriptions;
DROP TRIGGER IF EXISTS update_subscription_plans_updated_on ON subscription_plans;