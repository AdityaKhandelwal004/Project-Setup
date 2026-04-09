-----------
-- Insurance Policy Types
CREATE TABLE IF NOT EXISTS insurance_policy_types (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(70) UNIQUE NOT NULL,
  name VARCHAR(255) UNIQUE NOT NULL,
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

CREATE TRIGGER update_insurance_policy_types_modtime BEFORE
UPDATE ON insurance_policy_types 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-----------
-- User Insurance Policies
CREATE TABLE IF NOT EXISTS user_insurance_policies (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users ON UPDATE CASCADE ON DELETE RESTRICT,
  insurance_policy_type_id BIGINT NOT NULL REFERENCES insurance_policy_types ON UPDATE CASCADE ON DELETE RESTRICT,
  custom_insurance_policy_type VARCHAR(255),
  renewed_from BIGINT,
  policy_number VARCHAR(70) UNIQUE NOT NULL,
  insured_entity TEXT NOT NULL,
  insurer_name VARCHAR(255) NOT NULL,
  insured_amount BIGINT NOT NULL,
  premium_amount BIGINT NOT NULL,
  currency_code VARCHAR(10) NOT NULL,
  premium_frequency VARCHAR(17) NOT NULL,
  is_inside_super BOOLEAN NOT NULL,
  renewal_date TIMESTAMPTZ,
  contact_number VARCHAR(15),
  claim_form_url TEXT,
  paid_on TIMESTAMPTZ,
  status VARCHAR(17) NOT NULL DEFAULT 'ACTIVE',
  reserve1 VARCHAR(1),
  reserve2 VARCHAR(1),
  reserve3 VARCHAR(1),
  reserve4 VARCHAR(1),
  created_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  created_by BIGINT NOT NULL,
  updated_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_insurance_policies_modtime BEFORE
UPDATE ON user_insurance_policies 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-----------
-- User Insurance Policy Documents
CREATE TABLE user_insurance_policy_documents (
  user_insurance_policy_id BIGINT NOT NULL REFERENCES user_insurance_policies ON UPDATE CASCADE ON DELETE RESTRICT,
  user_vault_document_id BIGINT NOT NULL REFERENCES user_vault_documents ON UPDATE CASCADE ON DELETE RESTRICT,
  PRIMARY KEY (user_insurance_policy_id, user_vault_document_id)
);

-- =========================================================
-- SEED DATA FOR insurance_policy_types
-- =========================================================
INSERT INTO insurance_policy_types (code, name, status, created_by, updated_by)
VALUES
  ('TRAVEL', 'Travel', 'ACTIVE', 1, 1),
  ('MEDICAL', 'Medical', 'ACTIVE', 1, 1),
  ('CAR', 'Car', 'ACTIVE', 1, 1),
  ('PET', 'Pet', 'ACTIVE', 1, 1),
  ('BUILDING', 'Building', 'ACTIVE', 1, 1),
  ('HOME_AND_CONTENTS', 'Home and Contents', 'ACTIVE', 1, 1),
  ('LANDLORDS', 'Landlords', 'ACTIVE', 1, 1),
  ('LIFE_INSIDE_SUPER', 'Life inside Super', 'ACTIVE', 1, 1),
  ('LIFE_OUTSIDE_SUPER', 'Life outside Super', 'ACTIVE', 1, 1),
  ('INCOME_PROTECTION', 'Income Protection', 'ACTIVE', 1, 1),
  ('TDP', 'TDP', 'ACTIVE', 1, 1),
  ('TRAUMA', 'Trauma', 'ACTIVE', 1, 1),
  ('LIFE', 'Life', 'ACTIVE', 1, 1),
  ('PUBLIC_INDEMNITY', 'Public Indemnity', 'ACTIVE', 1, 1),
  ('OTHER', 'Other', 'ACTIVE', 1, 1)
ON CONFLICT (code) DO NOTHING;
-- =========================================================
-- Permissions
-- =========================================================
INSERT INTO permissions (name, description, status)
VALUES 
  ('INSURANCE_POLICY_MANAGEMENT', 'Manage insurance policies with create and update operations', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
VALUES
  (
    (SELECT id FROM roles WHERE type = 'OBIE_USER'),
    (SELECT id FROM permissions WHERE name = 'INSURANCE_POLICY_MANAGEMENT')
  )
ON CONFLICT DO NOTHING;