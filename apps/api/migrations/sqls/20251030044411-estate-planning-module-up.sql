-- =========================================================
-- SYSTEM ESTATE PLANNING
-- =========================================================
-----------
-- System Estate Planning Templates
CREATE TABLE IF NOT EXISTS system_estate_planning_templates (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
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

CREATE TRIGGER update_system_estate_planning_templates_modtime BEFORE
UPDATE ON system_estate_planning_templates 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-----------
-- System Estate Planning Checkpoints
CREATE TABLE IF NOT EXISTS system_estate_planning_checkpoints (
  id BIGSERIAL PRIMARY KEY,
  system_estate_planning_template_id BIGINT NOT NULL REFERENCES system_estate_planning_templates ON UPDATE CASCADE ON DELETE RESTRICT,
  code VARCHAR(50) UNIQUE NOT NULL,
  sequence_number INT NOT NULL,
  presentation_meta_data JSONB NOT NULL,
  configuration_meta_data JSONB,
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

CREATE TRIGGER update_system_estate_planning_checkpoints_modtime BEFORE
UPDATE ON system_estate_planning_checkpoints 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-- =========================================================
-- USER ESTATE PLANNING
-- =========================================================
-----------
-- User Estate Planning Templates
CREATE TABLE IF NOT EXISTS user_estate_planning_templates (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users ON UPDATE CASCADE ON DELETE RESTRICT,
  code VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  started_on TIMESTAMPTZ,
  completed_on TIMESTAMPTZ,
  description TEXT,
  status VARCHAR(17) NOT NULL DEFAULT 'NOT_STARTED',
  reserve1 VARCHAR(1),
  reserve2 VARCHAR(1),
  reserve3 VARCHAR(1),
  reserve4 VARCHAR(1),
  created_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  created_by BIGINT NOT NULL,
  updated_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_estate_planning_templates_modtime BEFORE
UPDATE ON user_estate_planning_templates 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-----------
-- User Estate Planning Checkpoints
CREATE TABLE IF NOT EXISTS user_estate_planning_checkpoints (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users ON UPDATE CASCADE ON DELETE RESTRICT,
  user_estate_planning_template_id BIGINT NOT NULL REFERENCES user_estate_planning_templates ON UPDATE CASCADE ON DELETE RESTRICT,
  code VARCHAR(50) NOT NULL,
  sequence_number INT NOT NULL,
  presentation_meta_data JSONB NOT NULL,
  configuration_meta_data JSONB,
  started_on TIMESTAMPTZ,
  completed_on TIMESTAMPTZ,
  status VARCHAR(17) NOT NULL DEFAULT 'NOT_STARTED',
  reserve1 VARCHAR(1),
  reserve2 VARCHAR(1),
  reserve3 VARCHAR(1),
  reserve4 VARCHAR(1),
  created_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  created_by BIGINT NOT NULL,
  updated_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  updated_by BIGINT NOT NULL
);

CREATE TRIGGER update_user_estate_planning_checkpoints_modtime BEFORE
UPDATE ON user_estate_planning_checkpoints 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-----------
-- User Estate Planning Checkpoint Documents
CREATE TABLE user_estate_planning_checkpoint_documents (
  user_estate_planning_checkpoint_id BIGINT NOT NULL REFERENCES user_estate_planning_checkpoints ON UPDATE CASCADE ON DELETE RESTRICT,
  user_vault_document_id BIGINT NOT NULL REFERENCES user_vault_documents ON UPDATE CASCADE ON DELETE RESTRICT,
  PRIMARY KEY (user_estate_planning_checkpoint_id, user_vault_document_id)
);

-- =========================================================
-- SEED DATA FOR system_estate_planning_templates
-- =========================================================
INSERT INTO system_estate_planning_templates (code, name, description, status, created_by, updated_by) VALUES
('LIFE_PACK', 'Life Pack (Estate Planning)', 'The biggest issue upon a death is finding all the documents, account numbers, PIN numbers, and policies. Let’s create your Life Pack and you are all set.', 'ACTIVE', 1, 1)
ON CONFLICT (code) DO NOTHING;

-- =========================================================
-- SEED DATA FOR system_estate_planning_checkpoints
-- =========================================================
INSERT INTO system_estate_planning_checkpoints (
  system_estate_planning_template_id,
  code,
  sequence_number,
  presentation_meta_data,
  configuration_meta_data,
  status,
  created_by,
  updated_by
)
VALUES
((SELECT id FROM system_estate_planning_templates WHERE code = 'LIFE_PACK'), 'WILLS', 1,
 '{"title": "Wills", "description": "Sets out your wishes regarding the distribution of your property and assets. It does not include the distribution of your super. Less than a third of people do not have a will."}', '{"allowUploads": true}', 'ACTIVE', 1, 1),
((SELECT id FROM system_estate_planning_templates WHERE code = 'LIFE_PACK'), 'POWER_OF_ATTORNEY', 2,
 '{"title": "Power of Attorney", "description": "Medically and mentally incapacitated. Assign authority to someone you trust to act for you when you can’t."}', NULL, 'ACTIVE', 1, 1),
((SELECT id FROM system_estate_planning_templates WHERE code = 'LIFE_PACK'), 'GUARDIANSHIP_OF_CHILDREN', 3,
 '{"title": "Guardianship of Children", "description": "Makes sure you name a caregiver and gives them the legal rights regarding the care of your kids when you can’t."}', NULL, 'ACTIVE', 1, 1),
((SELECT id FROM system_estate_planning_templates WHERE code = 'LIFE_PACK'), 'ORGAN_DONATION', 4,
 '{"title": "Organ Donation", "description": "Only 1 in 3 people are actually registered for organ donation. They need more. This is where you state your wish to donate or not to donate organs."}', NULL, 'ACTIVE', 1, 1),
((SELECT id FROM system_estate_planning_templates WHERE code = 'LIFE_PACK'), 'FUNERAL_ARRANGEMENTS', 5,
 '{"title": "Funeral Arrangements", "description": "There are big changes in the way funerals can be conducted now. Do it your way and plan ahead."}', NULL, 'ACTIVE', 1, 1),
((SELECT id FROM system_estate_planning_templates WHERE code = 'LIFE_PACK'), 'EXECUTOR_GUIDE', 6,
 '{"title": "Executor Guide", "description": "Lost in translation. Make it clear and set your intent. Assist your executor to know what and why you wanted things as you do."}', NULL, 'ACTIVE', 1, 1),
((SELECT id FROM system_estate_planning_templates WHERE code = 'LIFE_PACK'), 'DIGITAL_PASSWORDS', 7,
 '{"title": "Digital Passwords", "description": "Leave your records in order. Make it easy for your executor to close down your digital accounts."}', NULL, 'ACTIVE', 1, 1),
((SELECT id FROM system_estate_planning_templates WHERE code = 'LIFE_PACK'), 'MY_FINAL_PLAYLIST', 8,
 '{"title": "Digital Passwords", "description": "Leave your records in order. Make it easy for your executor to close down your digital accounts."}', NULL, 'ACTIVE', 1, 1),
((SELECT id FROM system_estate_planning_templates WHERE code = 'LIFE_PACK'), 'WILL_KIT', 9,
 '{"title": "Online Will Kit", "description": "A Will Kit helps you easily record and protect your final wishes, ensuring your assets are distributed exactly as you intend"}', '{"thirdPartyIntegrationEnabled": true, "thirdPartyLink": "https://www.obiemoney.com"}', 'ACTIVE', 1, 1)
ON CONFLICT (code) DO NOTHING;

-- =========================================================
-- Permissions
-- =========================================================
INSERT INTO permissions (name, description, status)
VALUES 
  ('ESTATE_PLANNING_MANAGEMENT', 'Manage estate planning with create and update operations', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
VALUES
  (
    (SELECT id FROM roles WHERE type = 'OBIE_USER'),
    (SELECT id FROM permissions WHERE name = 'ESTATE_PLANNING_MANAGEMENT')
  )
ON CONFLICT DO NOTHING;
