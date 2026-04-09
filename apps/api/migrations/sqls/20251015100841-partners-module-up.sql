-----------
-- Partners Categories
CREATE TABLE IF NOT EXISTS partner_categories (
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

CREATE TRIGGER update_partner_categories_modtime BEFORE
UPDATE ON partner_categories 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-----------
-- Partners
CREATE TABLE IF NOT EXISTS partners (
  id BIGSERIAL PRIMARY KEY,
  partner_category_id BIGINT REFERENCES partner_categories ON UPDATE CASCADE ON DELETE RESTRICT,
  name VARCHAR(255) UNIQUE NOT NULL,
  thumbnail_url TEXT,
  partner_url TEXT NOT NULL,
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

CREATE TRIGGER update_partners_modtime BEFORE
UPDATE ON partners 
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();