-- =========================================================
-- DROP TABLES
-- =========================================================
DROP TABLE IF EXISTS user_safety_net_ledger;
DROP TABLE IF EXISTS user_safety_net_goals;
DROP TABLE IF EXISTS safety_net_goals;

-- =========================================================
-- DROP ENUM TYPES
-- =========================================================
DROP TYPE IF EXISTS source_types;
DROP TYPE IF EXISTS transaction_types;
DROP TYPE IF EXISTS goal_types;
