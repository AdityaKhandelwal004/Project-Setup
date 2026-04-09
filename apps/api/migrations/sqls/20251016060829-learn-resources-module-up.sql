-----------
-- Learn Resource Categories
CREATE TABLE IF NOT EXISTS learn_resource_categories (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(17) UNIQUE NOT NULL,
  name VARCHAR(255) UNIQUE NOT NULL,
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

CREATE TRIGGER update_learn_resource_categories_modtime BEFORE
UPDATE ON learn_resource_categories 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-----------
-- Learn Resource Types
CREATE TABLE IF NOT EXISTS learn_resource_types (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
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

CREATE TRIGGER update_learn_resource_types_modtime BEFORE
UPDATE ON learn_resource_types 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-----------
-- Learn Resource Tags
CREATE TABLE IF NOT EXISTS learn_resource_tags (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
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

CREATE TRIGGER update_learn_resource_tags_modtime BEFORE
UPDATE ON learn_resource_tags 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-----------
-- Learn Resources
CREATE TABLE IF NOT EXISTS learn_resources (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) UNIQUE NOT NULL,
  learn_resource_type_id BIGINT NOT NULL REFERENCES learn_resource_types ON UPDATE CASCADE ON DELETE RESTRICT,
  learn_resource_category_id BIGINT NOT NULL REFERENCES learn_resource_categories ON UPDATE CASCADE ON DELETE RESTRICT,
  thumbnail_url TEXT,
  resource_url TEXT NOT NULL,
  author VARCHAR(255),
  search_keywords VARCHAR(255),
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

CREATE TRIGGER update_learn_resources_modtime BEFORE
UPDATE ON learn_resources 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();


CREATE TABLE learn_resource_linked_tags (
  learn_resource_id BIGINT NOT NULL REFERENCES learn_resources ON UPDATE CASCADE ON DELETE RESTRICT,
  learn_resource_tag_id BIGINT NOT NULL REFERENCES learn_resource_tags ON UPDATE CASCADE ON DELETE RESTRICT,
  PRIMARY KEY (learn_resource_id, learn_resource_tag_id)
);

-- =========================
-- Permissions
-- =========================
INSERT INTO permissions (name, description, status)
VALUES 
  -- Safety Net Management Permissions
  ('PARTNER_MANAGEMENT', 'Manage partner with create and update operations', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

-- =========================
-- Assign Permissions to Roles
-- =========================
INSERT INTO role_permissions (role_id, permission_id)
VALUES
    (
        (SELECT id FROM roles WHERE type = 'SUPER_ADMIN'),
        (SELECT id FROM permissions WHERE name = 'PARTNER_MANAGEMENT')
    );

-- =========================================================
-- SEED DATA FOR learn_resource_categories
-- =========================================================
INSERT INTO learn_resource_categories (code, name, description, status, created_by, updated_by) VALUES
('BUDGET', 'Budget', 'Spend less without feeling like youre missing out', 'ACTIVE', 1, 1),
('SAFETY_NET', 'Safety net', 'Build your finantial safety net(because life happens)', 'ACTIVE', 1, 1),
('DEBT', 'Debt', 'Crush your debt for good', 'ACTIVE', 1, 1),
('SAVINGS_GOALS', 'Saving goals', 'Save more without even thinking about it', 'ACTIVE', 1, 1),
('SUPER', 'Super', 'Make your money work for you', 'ACTIVE', 1, 1),
('INVESTING', 'Investing', 'Invest wisely for your future', 'ACTIVE', 1, 1),
('INSURANCE', 'Insurance', 'Protect yourself and your loved ones', 'ACTIVE', 1, 1),
('ASSET_PROTECTION', 'Asset protection', 'Protect your assets', 'ACTIVE', 1, 1),
('ESTATE_PLANNING', 'Estate planning', 'Plan for the future', 'ACTIVE', 1, 1)
ON CONFLICT (code) DO NOTHING;
