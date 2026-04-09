-----------
-- Asset Types
CREATE TABLE IF NOT EXISTS asset_types (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) UNIQUE NOT NULL,
  configuration_meta_data JSONB,
  description TEXT,
  status status_enum NOT NULL DEFAULT 'ACTIVE',
  reserve1 VARCHAR(1),
  reserve2 VARCHAR(1),
  reserve3 VARCHAR(1),
  reserve4 VARCHAR(1),
  created_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  created_by BIGINT NOT NULL,
  updated_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_asset_types_modtime BEFORE
UPDATE ON asset_types 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-----------
-- User Assets
CREATE TABLE IF NOT EXISTS user_assets (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users ON UPDATE CASCADE ON DELETE RESTRICT,
  asset_type_id BIGINT NOT NULL REFERENCES asset_types ON UPDATE CASCADE ON DELETE RESTRICT,
  custom_asset_type VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  asset_amount BIGINT NOT NULL,
  currency_code VARCHAR(10) NOT NULL,
  image_url TEXT,
  meta_data JSONB,
  status status_enum NOT NULL DEFAULT 'ACTIVE',
  reserve1 VARCHAR(1),
  reserve2 VARCHAR(1),
  reserve3 VARCHAR(1),
  reserve4 VARCHAR(1),
  created_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  created_by BIGINT NOT NULL,
  updated_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_assets_modtime BEFORE
UPDATE ON user_assets
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-----------
-- User Asset Liabilities
CREATE TABLE IF NOT EXISTS user_asset_liabilities (
  id BIGSERIAL PRIMARY KEY,
  user_asset_id BIGINT NOT NULL REFERENCES user_assets ON UPDATE CASCADE ON DELETE RESTRICT,
  user_debt_id BIGINT,
  liability_type VARCHAR(17) NOT NULL,
  amount BIGINT,
  currency_code VARCHAR(10),
  frequency VARCHAR(17),
  status status_enum NOT NULL DEFAULT 'ACTIVE',
  reserve1 VARCHAR(1),
  reserve2 VARCHAR(1),
  reserve3 VARCHAR(1),
  reserve4 VARCHAR(1),
  created_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  created_by BIGINT NOT NULL,
  updated_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_asset_liabilities_modtime BEFORE
UPDATE ON user_asset_liabilities
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-- =========================================================
-- Permissions
-- =========================================================
INSERT INTO permissions (name, description, status)
VALUES 
  ('ASSET_MANAGEMENT', 'Manage assets with create and update operations', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

-- =========================
-- Assign Permissions to Roles
-- =========================
INSERT INTO role_permissions (role_id, permission_id)
VALUES
  (
    (SELECT id FROM roles WHERE type = 'OBIE_USER'),
    (SELECT id FROM permissions WHERE name = 'ASSET_MANAGEMENT')
  )
ON CONFLICT DO NOTHING;

-- =========================================================
-- Seed Data for asset_types
-- =========================================================
INSERT INTO asset_types (code, name, configuration_meta_data, description, created_by, updated_by)
VALUES
  -- Property Type
  ('HOME_PPR', 'Home PPR', '{"isProperty": true, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('HOLIDAY_HOME', 'Holiday Home', '{"isProperty": true, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('HOLIDAY_RENTAL', 'Holiday Rental', '{"isProperty": true, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('RESIDENTIAL_INVESTMENT_PROPERTY', 'Residential Investment Property', '{"isProperty": true, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('COMMERCIAL_PROPERTY', 'Commercial Property', '{"isProperty": true, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('INDUSTRIAL_PROPERTY', 'Industrial Property', '{"isProperty": true, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('BLOCK_OF_UNITS', 'Block of Units', '{"isProperty": true, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('TIMESHARE', 'Timeshare', '{"isProperty": true, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('VACANT_LAND', 'Vacant Land', '{"isProperty": true, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('RURAL_PROPERTY', 'Rural Property', '{"isProperty": true, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),

  -- Non Property Type
  ('VEHICLES', 'Vehicles', '{"isProperty": false, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('BUSINESS', 'Business', '{"isProperty": false, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('CASH', 'Cash', '{"isProperty": false, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('SAVINGS_ACCOUNTS', 'Savings Accounts', '{"isProperty": false, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('COLLECTIONS', 'Collections', '{"isProperty": false, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('LIFE_INSURANCE', 'Life Insurance', '{"isProperty": false, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('SHARES', 'Shares', '{"isProperty": false, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('ETFS', 'ETF’s', '{"isProperty": false, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('MANAGED_FUNDS', 'Managed Funds', '{"isProperty": false, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('TERM_DEPOSIT', 'Term Deposit', '{"isProperty": false, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('INVESTMENT_SAVINGS', 'Investment Savings', '{"isProperty": false, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1),
  ('OTHER', 'Other', '{"isProperty": false, "needProtection": false, "protectionGuidelines": null}'::jsonb, NULL, 1, 1)
ON CONFLICT (code) DO NOTHING;
